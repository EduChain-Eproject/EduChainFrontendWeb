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

    const [error, setError] = useState<string | undefined>(undefined);
    const [successfulMessage, setSuccessfulMessage] = useState(false);
    const { cate, status, errorUpdate: fetchError } = useAppSelector((state: RootState) => state.cates);

    useEffect(() => {
        if (cateId) {
            dispatch(fetchCate(cateId));
        }
    }, [dispatch, cateId]);

    useEffect(() => {
        if (status === 'succeeded' && cate && cate.id === cateId) {
            setValue('categoryName', cate.categoryName || '');
        }
    }, [cate, cateId, setValue, status]);

    useEffect(() => {
        if (status === 'failed') {
            setError(fetchError);
        }
    }, [fetchError, status]);

    useEffect(() => {
        return () => {
            setError(undefined);
            setSuccessfulMessage(false);
        };
    }, []);

    const handleFormSubmit = async (cateData: UpdateCateReq) => {
        try {
            const resultAction = await dispatch(updateCate({ cateId, cateData }));

            if (updateCate.fulfilled.match(resultAction)) {
                setSuccessfulMessage(true);
                reset();

                setTimeout(() => {
                    setSuccessfulMessage(false);
                    navigate('/dashboard/blog_category');
                }, 3000);
            } else if (updateCate.rejected.match(resultAction)) {
                const errorMessage = resultAction.error.message || 'Failed to update category';
                setError(errorMessage);
            }
        } catch (err) {
            console.error('Error while updating category:', err);
            setError('An unexpected error occurred.');
        }
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                    <p className="font-bold">Error!</p>
                    <p>{error}</p>
                </div>
            )}
            {successfulMessage && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                    <p className="font-bold">Success!</p>
                    <p>Category updated successfully.</p>
                </div>
            )}
            <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        {...register('categoryName', { required: 'Category name is required' })}
                    />
                    {errors.categoryName && (
                        <p className="text-red-500 text-xs italic mt-2">
                            {errors.categoryName.message}
                        </p>
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
