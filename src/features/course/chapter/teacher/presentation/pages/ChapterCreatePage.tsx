import React, { useEffect } from 'react';
import { useParams, RouteObject } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import ChapterForm from '../components/ChapterForm';
import { fetchCourseDetail } from '../../../../course/teacher/data/services/handleFetchCourseDetail';

export const route: () => RouteObject = () => {
  return {
    path: 'chapters/course/:courseId/create/',
    element: <ChapterCreatePage />,
  };
};

const ChapterCreatePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.chapters.teacher.createChapterPage);
  const { data: courseData } = useAppSelector((state) => state.courses.teacher.courseDetailPage);

  useEffect(() => {
    dispatch(fetchCourseDetail(Number(courseId)));
  }, [courseId, dispatch]);

  const breadCrumbItems = [
    { label: 'Home', href: '/dashboard/teacher' },
    { label: 'Course by you', href: '/dashboard/teacher/courses' },
    { label: `Course ${courseData?.title}`, href: `/dashboard/teacher/courses/${courseData?.id}` },
    { label: 'Create chapter', href: `/dashboard/teacher/courses/${courseId}/chapters/create` },
  ];

  return (
    <div className="p-4">
      <AppBreadcrumb items={breadCrumbItems} />
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Create Chapter</h1>
        {status === 'loading' && <div>Loading...</div>}
        {status === 'failed' && <div>Error: {error}</div>}
        <ChapterForm courseId={Number(courseId)} />
      </div>
    </div>
  );
};

export default ChapterCreatePage;
