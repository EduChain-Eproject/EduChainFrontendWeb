import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { createCate } from '../redux/cateAction';
import { CreateCateReq } from '../../domain/usecases/CreateCate';
import { BlogCategory } from '../../domain/entities/BlogCategory';

interface BlogCateCreateProps {
    initialData?: CreateCateReq;
    onSubmit?: (data: BlogCategory) => void;
}

const BlogCateCreate: React.FC<BlogCateCreateProps> = ({ initialData, onSubmit }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateCateReq>({
        defaultValues: initialData || { categoryName: '' },
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState<string | undefined>(undefined);

    const errorFromReducer = useAppSelector((state: RootState) => state.cates.error);

    const [successfulMessage, setSuccessfulMessage] = useState(false);

    useEffect(() => {
        setError(errorFromReducer);
    }, [errorFromReducer]);

    const handleFormSubmit = async (data: CreateCateReq) => {
        try {
            await dispatch(createCate(data));
            
            if (onSubmit) {
                onSubmit(data as BlogCategory);
            }

            if (error == '') {
                setSuccessfulMessage(true);
                reset();
    
                setTimeout(() => {
                    setSuccessfulMessage(false);
                    navigate('/dashboard/blog_category');
                }, 3000);
            }
    
        } catch (err) {
            console.error('Error while creating category:', err);
            if (err.response && err.response.status === 409) {
                setError('Category name already exists');
            } else {
                setError('Failed to create category');
            }
        }
    };

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
                    <p>Category created successfully.</p>
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
                    Submit
                </button>
            </form>
        </div>
    );
};

export default BlogCateCreate;
