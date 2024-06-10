import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchCourses } from '../redux/courseActions';

const CourseList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { courses, status, error } = useAppSelector((state) => state.courses);

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Courses</h1>
            <ul>
                {courses?.map((course: any) => (
                    <li key={course.id}>{course.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;
