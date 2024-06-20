import React, { useEffect } from 'react';

import CourseForm from '../components/CourseForm';
import { useAppDispatch } from '../../../../../../common/context/store';
import { createCourse, fetchListCategories } from '../redux/courseActions';
import { RouteObject } from 'react-router-dom';

export const route: () => RouteObject = () => {
    return {
        path: "course/create",
        element: <CreateCoursePage />
    }
}

const CreateCoursePage: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleSubmit = (data: any) => {
        dispatch(createCourse(data));
    };

    useEffect(() => {
        dispatch(fetchListCategories())
    }, [dispatch])

    return (
        <div>
            <h1>Create Course</h1>
            <CourseForm onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateCoursePage;
