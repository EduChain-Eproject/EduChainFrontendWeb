import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Course from '../../domain/entities/Course';
import { useAppSelector } from '../../../../../../common/context/store';
import Category from '../../domain/entities/Category';
import { CreateCourseReq } from '../../domain/usecases/CreateCourse';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearErrorStatus } from '../redux/courseSlice';

interface CourseFormProps {
    initialData?: CreateCourseReq;
    onSubmit: (data: CreateCourseReq) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ initialData, onSubmit }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories: Category[] | undefined = useAppSelector(
        (state) => state.courses.teacher.createCoursePage.data
    );
    const { status, error } = useAppSelector(state => state.courses.teacher.createCoursePage);

    const { register, handleSubmit, reset, control } = useForm<CreateCourseReq>({
        defaultValues: initialData || {},
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    useEffect(() => {
        if (status === 'create course succeeded') {
            navigate('/teacher/courses');
        }
    }, [status, navigate]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
                <div className="text-red-500 mb-4">
                    {error}
                    <button
                        type="button"
                        className="ml-2 text-blue-500 hover:underline"
                        onClick={() => dispatch(clearErrorStatus("createCoursePage"))}
                    >
                        Clear error
                    </button>
                </div>
            )}

            <div>
                <label htmlFor="title" className="block font-medium text-gray-700">
                    Title
                </label>
                <input
                    id="title"
                    {...register('title', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="description" className="block font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    {...register('description', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="price" className="block font-medium text-gray-700">
                    Price
                </label>
                <input
                    id="price"
                    type="number"
                    {...register('price', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block font-medium text-gray-700">Categories</label>
                <div className="mt-2 space-y-2">
                    {categories?.map((cate) => (
                        <div key={cate.categoryName} className="flex items-center">
                            <Controller
                                name={`categoryIds.${cate.id}`}
                                control={control}
                                // defaultValue={false}
                                render={({ field }) => (
                                    <input
                                        type="checkbox"
                                        {...field}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                )}
                            />
                            <label className="ml-3 block text-sm font-medium text-gray-700">
                                {cate.categoryName} - {cate.id}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Submit
            </button>
        </form>
    );
};

export default CourseForm;
