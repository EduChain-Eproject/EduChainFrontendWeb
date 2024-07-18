import React, { useEffect } from 'react';
import { useParams, useNavigate, RouteObject } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import LessonCreateForm from '../components/LessonCreateForm';
import { getChapterDetail } from '../../../../chapter/teacher/data/services/handleGetChapterDetail';

export const route: () => RouteObject = () => {
  return {
    path: 'lessons/create/chapters/:chapterId/',
    element: <LessonCreatePage />,
  };
};

const LessonCreatePage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error, data } = useAppSelector(
    (state) => state.chapters.teacher.chapterDetailPage,
  );

  useEffect(() => {
    dispatch(getChapterDetail(Number(chapterId)));
  }, [chapterId, dispatch]);

  const breadCrumbItems = [
    { label: 'Home', href: '/dashboard/teacher' },
    { label: 'Course by you', href: '/dashboard/teacher/courses' },
    {
      label: `Course ${data?.courseDto?.title}`,
      href: `/dashboard/teacher/courses/${data?.courseDto.id}`,
    },
    {
      label: `Chapter ${data?.chapterTitle}`,
      href: `/dashboard/teacher/chapters/${data?.id}`,
    },
    {
      label: `Create Lesson`,
      href: `/dashboard/teacher/lessons/create/chapters/${chapterId}`,
    },
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
        <h1 className="text-2xl font-bold mb-4">Create Lesson</h1>
        <LessonCreateForm chapterId={Number(chapterId)} />
      </div>
    </div>
  );
};

export default LessonCreatePage;
