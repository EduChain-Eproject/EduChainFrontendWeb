import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CourseForm from '../../components/CourseForm';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { fetchCourseDetail, updateCourse } from '../../redux/courseActions';
import { RouteObject } from 'react-router-dom';

export const route: () => RouteObject = () => {
    return {
        path: "course/update/:courseId",
        element: <UpdateCoursePage />
    }
}

const UpdateCoursePage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const dispatch = useAppDispatch();
    const { courseDetail } = useAppSelector((state) => state.courses);

    useEffect(() => {
        if (courseId) {
            dispatch(fetchCourseDetail(courseId));
        }
    }, [courseId, dispatch]);

    const handleSubmit = (data: any) => {
        if (courseId) {
            dispatch(updateCourse({ courseId, courseData: data }));
        }
    };

    return (
        <div>
            <h1>Update Course</h1>
            {courseDetail && <CourseForm initialData={courseDetail} onSubmit={handleSubmit} />}
        </div>
    );
};

export default UpdateCoursePage;
