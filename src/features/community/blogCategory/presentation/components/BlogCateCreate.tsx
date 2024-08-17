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
    const createCateResult = useAppSelector((s)=>s.cates.createCateState)


    const handleFormSubmit = async (data: CreateCateReq) => {
    try {
        await dispatch(createCate(data));
        
        if (onSubmit) {
            onSubmit(data as BlogCategory);
        }

    } catch (err) {
        console.error('Error while creating category:', err);
 
    }
};

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
                        {...register('categoryName')}
                    />
                   {createCateResult?.errors?.categoryName && (
              <p className="text-red-500 text-xs italic mt-1">{createCateResult?.errors?.categoryName}</p>
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