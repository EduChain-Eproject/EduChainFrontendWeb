import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { useEffect } from 'react';
import React from 'react';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import { fetchLessonDetail } from '../../data/services/handleGetLessonDetail';
import { deleteLesson } from '../../data/services/handleDeleteLesson';
import HomeworkList from '../components/HomeworkList';

export const route: () => RouteObject = () => {
  return {
    path: 'lessons/:lessonId',
    element: <LessonDetailPage />,
  };
};

const LessonDetailPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    status,
    error,
    data: lesson,
  } = useAppSelector((state) => state.lessons.teacher.lessonDetailPage);

  useEffect(() => {
    dispatch(fetchLessonDetail(Number(lessonId)));
  }, [lessonId, dispatch]);

  const breadCrumbItems = [
    { label: 'Home', href: '/dashboard/teacher' },
    { label: 'Course by you', href: '/dashboard/teacher/courses' },
    {
      label: `Course ${lesson?.chapterDto?.courseDto?.title}`,
      href: `/dashboard/teacher/courses/${lesson?.chapterDto?.courseDto.id}`,
    },
    {
      label: `Chapter ${lesson?.chapterDto?.chapterTitle}`,
      href: `/dashboard/teacher/chapters/${lesson?.chapterDto.id}`,
    },
    {
      label: `Lesson ${lesson?.lessonTitle}`,
      href: `/dashboard/teacher/lessons/${lessonId}`,
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
      <div className="flex flex-row">
        <div className="bg-white shadow rounded-lg p-6 w-full">
          <h1 className="text-2xl font-bold mb-4">Lesson Detail</h1>
          <div>
            <h2 className="text-xl font-semibold">{lesson?.lessonTitle}</h2>
            <p>{lesson?.description}</p>
            <h3 className="text-lg font-medium">Video</h3>
            <p>{lesson?.videoTitle}</p>
            <a
              href={lesson?.videoURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {lesson?.videoURL}
            </a>
            <div className="space-x-2 mt-4">
              <button
                onClick={() =>
                  navigate(`/dashboard/teacher/lessons/update/${lessonId}`)
                }
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this lesson?',
                    )
                  ) {
                    dispatch(deleteLesson(Number(lessonId)));
                  }
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        {lesson?.homeworkDtos && (
          <HomeworkList
            homeworks={lesson.homeworkDtos}
            handleClickHomework={() => {
              navigate(
                `/dashboard/teacher/homeworks/create/lesson/${lessonId}`,
              );
            }}
          />
        )}
      </div>
    </div>
  );
};
