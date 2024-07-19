import React from 'react';
import { useEffect } from 'react';
import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { fetchLessonDetail } from '../../../../lesson/teacher/data/services/handleGetLessonDetail';
import { createHomework } from '../../data/services/createHomework';
import HomeworkForm from '../components/HomeworkForm';

export const route: () => RouteObject = () => {
  return {
    path: 'homeworks/create/lesson/:lessonId/',
    element: <HomeworkCreatePage />,
  };
};

const HomeworkCreatePage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: lesson } = useAppSelector(
    (state) => state.lessons.teacher.lessonDetailPage,
  );

  useEffect(() => {
    dispatch(fetchLessonDetail(Number(lessonId)));
  }, [lessonId, dispatch]);

  const breadCrumbItems = [
    { label: 'Home', href: '/dashboard/teacher' },
    { label: 'Course by you', href: '/dashboard/teacher/courses' },
    {
      label: `Course ${lesson?.chapterDto?.courseDto?.title}`,
      href: `/dashboard/teacher/courses/${lesson?.chapterDto?.courseDto?.id}`,
    },
    {
      label: `Chapter ${lesson?.chapterDto?.chapterTitle}`,
      href: `/dashboard/teacher/chapters/${lesson?.chapterDto?.id}`,
    },
    {
      label: `Lesson ${lesson?.lessonTitle}`,
      href: `/dashboard/teacher/lessons/${lessonId}`,
    },
    {
      label: `Lesson ${lesson?.lessonTitle}`,
      href: `/dashboard/teacher/homeworks/create/lessons/${lessonId}`,
    },
  ];

  const handleCreate = (title: string, description: string) => {
    dispatch(createHomework({ lessonId: Number(lessonId), title, description }))
      .unwrap()
      .then(() => {
        navigate(`/dashboard/teacher/lessons/${lessonId}`);
      });
  };

  return (
    <div className="p-4">
      <AppBreadcrumb items={breadCrumbItems} />
      <h1 className="text-2xl font-bold mb-4">Create Homework</h1>
      <HomeworkForm onSubmit={handleCreate} />
    </div>
  );
};

export default HomeworkCreatePage;
