import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Course from '../../domain/entities/Course';

interface CourseFormProps {
    initialData?: Course;
    onSubmit: (data: any) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ initialData, onSubmit }) => {
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
            <button type="submit">Submit</button>
        </form>
    );
};

export default CourseForm;
