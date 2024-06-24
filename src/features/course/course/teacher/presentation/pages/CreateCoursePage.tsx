import React, { useEffect } from 'react';

import CourseForm from '../components/CourseForm';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { createCourse, fetchListCategories } from '../redux/courseActions';
import { RouteObject, useNavigate } from 'react-router-dom';
import { CreateCourseReq } from '../../domain/usecases/CreateCourse';

export const route: () => RouteObject = () => {
    return {
        path: "course/create",
        element: <CreateCoursePage />
    }
}

const CreateCoursePage: React.FC = () => {
    const { status, error } = useAppSelector(state => state.courses.teacher);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = (data: CreateCourseReq) => {
        // Convert the categoryIds object to an array
        const categoryIds = Object.keys(data.categoryIds)
            .filter((key) => data.categoryIds[key])
            .map((key) => parseInt(key, 10));

        const submitData = {
            ...data,
            categoryIds,
        };

        dispatch(createCourse(submitData));

        if (status === 'succeeded') {
            navigate('/teacher/courses');
        }
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
