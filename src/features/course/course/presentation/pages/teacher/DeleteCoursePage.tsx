import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { deleteCourse, fetchCourseDetail } from '../../redux/courseActions';

import { RouteObject } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const route: () => RouteObject = () => {
    return {
        path: "course/delete/:courseId",
        element: <DeleteCoursePage />
    }
}

const DeleteCoursePage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { courseDetail } = useAppSelector((state) => state.courses);


    useEffect(() => {
        if (courseId) {
            dispatch(fetchCourseDetail(courseId));
        }
    }, [courseId, dispatch]);

    const handleDelete = () => {
        if (courseId) {
            dispatch(deleteCourse(courseId));
            navigate('/courses'); // Redirect to courses list page after deletion
        }
    };

    return (
        <div>
            <h1>Delete Course</h1>
            {courseDetail && (
                <div>
                    <p>Are you sure you want to delete the course: {courseDetail.title}?</p>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default DeleteCoursePage;
