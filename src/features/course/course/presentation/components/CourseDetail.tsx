import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchCourseDetail } from '../redux/courseActions';
const CourseDetail: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const dispatch = useAppDispatch();
    const { courseDetail, status, error } = useAppSelector((state) => state.courses);

    useEffect(() => {
        if (courseId) {
            dispatch(fetchCourseDetail(courseId));
        }
    }, [dispatch, courseId]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {courseDetail && (
                <>
                    <h1>{courseDetail.title}</h1>
                    <p>{courseDetail.description}</p>
                    <p>Instructor: {courseDetail.instructor}</p>
                </>
            )}
        </div>
    );
};

export default CourseDetail;
