import React, { useEffect, useState } from 'react';
import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { fetchCourseDetail, searchCourses } from '../redux/courseActions';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import { CourseSearchParams } from '../../domain/usecases/SearchCourses';
import FilterBar from '../components/FilterBar';
import CourseList from '../components/CourseList';
import CourseDetail from '../components/CourseDetail';
import Curriculum from '../components/Curriculum';
import Teacher from '../components/Teacher';
import Feedback from '../components/Feedback';
import Enrollment from '../components/Enrollment';
import RelatedCourses from '../components/RelatedCourses';

export const route: () => RouteObject = () => {
    return {
        path: ":courseId",
        element: <CourseDetailPage />
    }
}

const CourseDetailPage: React.FC = () => {
    const navigate = useNavigate()
    const { courseId } = useParams<{ courseId: string }>();
    const dispatch = useAppDispatch();
    const { data: courseData, status, error } = useAppSelector(state => state.courses.student.courseDetailPage);

    useEffect(() => {
        dispatch(fetchCourseDetail(Number(courseId)));
    }, [courseId, dispatch]);

    const [activeTab, setActiveTab] = useState<'detail' | 'curriculum' | 'teacher' | 'feedback'>('detail');

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{courseData?.title}</h1>
            <div className="mb-4">
                <button onClick={() => setActiveTab('detail')} className="px-4 py-2 bg-blue-500 text-white rounded-md">Detail</button>
                <button onClick={() => setActiveTab('curriculum')} className="px-4 py-2 bg-blue-500 text-white rounded-md">Curriculum</button>
                <button onClick={() => setActiveTab('teacher')} className="px-4 py-2 bg-blue-500 text-white rounded-md">Teacher</button>
                <button onClick={() => setActiveTab('feedback')} className="px-4 py-2 bg-blue-500 text-white rounded-md">Feedback</button>
            </div>
            {activeTab === 'detail' && courseData && <CourseDetail course={courseData} />}
            {activeTab === 'curriculum' && courseData && <Curriculum chapters={courseData.chapters} onLessonClick={(lessonId) => navigate(`/courses/${courseId}/lessons/${lessonId}`)} />}
            {activeTab === 'teacher' && courseData && <Teacher
            //  teacher={courseData.teacher}
            />}
            {activeTab === 'feedback' && courseData && <Feedback feedbacks={courseData.courseFeedbacks} />}
            {courseData && <Enrollment course={courseData} />}

            {courseData?.relatedCourses && courseData.relatedCourses.length > 0 && (
                <RelatedCourses relatedCourses={courseData.relatedCourses} />
            )}
        </div>
    );
};

export default CourseDetailPage;