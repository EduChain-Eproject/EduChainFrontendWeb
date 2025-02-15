import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCate, updateCate } from '../redux/cateAction';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { UpdateCateReq } from '../../domain/usecases/UpdateCate';

const BlogCateUpdate: React.FC = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<UpdateCateReq>({
        defaultValues: { categoryName: '' },
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const params = useParams<{ cateId: string }>();
    const cateId = Number(params.cateId);
    const updateResult = useAppSelector(s=>s.cates.updateCateState);
    const fetchCateResult = useAppSelector((s)=>s.cates.fetchCateState)
    useEffect(() => {
        if (cateId) {
            dispatch(fetchCate(cateId));
        }
    }, [dispatch, cateId]);



    const handleFormSubmit = async (cateData: UpdateCateReq) => {
        try {
            const resultAction = await dispatch(updateCate({ cateId, cateData }))
            .unwrap()
            .then(() => {
                if(updateResult.status === 'succeeded')
                navigate('/dashboard/blog_category');
            });
        } catch (err) {
            console.error('Error while updating category:', err);
          
        }
    };

    if (updateResult.status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        placeholder={fetchCateResult.data?.categoryName}
                        {...register('categoryName')}
                    />
                 {updateResult?.errors?.categoryName && (
              <p className="text-red-500 text-xs italic mt-1">{updateResult?.errors?.categoryName}</p>
            )}
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Update
                </button>
            </form>
        </div>
    );
};

export default BlogCateUpdate;
