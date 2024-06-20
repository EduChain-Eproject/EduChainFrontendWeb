import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Course from '../../domain/entities/Course';
import { useAppSelector } from '../../../../../../common/context/store';
import Category from '../../domain/entities/Category';

interface CourseFormProps {
    initialData?: Course;
    onSubmit: (data: any) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ initialData, onSubmit }) => {
    const categories: Category[] | undefined = useAppSelector(state => state.courses.teacher.categories);
    const { register, handleSubmit, reset } = useForm<Course>({
        defaultValues: initialData || {}
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="title">Title</label>
                <input id="title" {...register('title', { required: true })} />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" {...register('description', { required: true })} />
            </div>
            {categories?.map(cate => (
                <div>{cate.categoryName}</div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default CourseForm;
