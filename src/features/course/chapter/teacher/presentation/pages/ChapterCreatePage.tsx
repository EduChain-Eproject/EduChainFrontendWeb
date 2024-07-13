import React, { useEffect } from 'react';
import { useParams, useNavigate, RouteObject } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { createChapter } from '../redux/courseActions';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import { CreateChapterReq } from '../../domain/usecases/CreateChapter';
import { fetchCourseDetail } from '../../../../course/teacher/presentation/redux/courseActions';
import ChapterForm from '../components/ChapterForm'


export const route: () => RouteObject = () => {
    return {
        path: "chapters/course/:courseId/create/",
        element: <ChapterCreatePage />
    }
}


const ChapterCreatePage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.chapters.teacher.createChapterPage);
    const { data: courseData } = useAppSelector((state) => state.courses.teacher.courseDetailPage);

    useEffect(() => {
        dispatch(fetchCourseDetail(Number(courseId)));
    }, [courseId, dispatch]);

    const breadCrumbItems = [
        { label: "Home", href: "/dashboard/teacher" },
        { label: "Course by you", href: "/dashboard/teacher/courses" },
        { label: `Course ${courseData?.title}`, href: `/dashboard/teacher/courses/${courseData?.id}` },
        { label: `Create chapter`, href: `/dashboard/teacher/courses/${courseId}/chapters/create` },
    ];

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <AppBreadcrumb items={breadCrumbItems} />
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Create Chapter</h1>
                <ChapterForm courseId={Number(courseId)} />
            </div>
        </div>
    );
};


export default ChapterCreatePage;

