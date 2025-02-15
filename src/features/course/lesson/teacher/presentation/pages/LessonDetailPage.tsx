import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { useEffect, useState } from 'react';
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

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(fetchLessonDetail(Number(lessonId)));
  }, [lessonId, dispatch]);

  const breadCrumbItems = [
    { label: 'Home', href: '/dashboard/teacher' },
    { label: 'Course by you', href: '/dashboard/teacher/courses' },
    {
      label: `Course ${lesson?.chapterDto?.courseDto?.title}`,
      href: `/dashboard/teacher/courses/${lesson?.chapterDto?.courseDto!.id}`,
    },
    {
      label: `Chapter ${lesson?.chapterDto?.chapterTitle}`,
      href: `/dashboard/teacher/chapters/${lesson?.chapterDto!.id}`,
    },
    {
      label: `Lesson ${lesson?.lessonTitle}`,
      href: `/dashboard/teacher/lessons/${lessonId}`,
    },
  ];

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-6">
      <div className="mx-auto max-w-5xl p-2 mb-5">
        <AppBreadcrumb items={breadCrumbItems} />
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full">
          <h1 className="text-3xl font-bold mb-4">Lesson Detail</h1>
          <div>
            <h2 className="text-xl font-semibold mb-2">{lesson?.lessonTitle}</h2>
            <p className="mb-4">{lesson?.description}</p>
            <h3 className="text-lg font-medium mb-2">Video</h3>
            <p className="mb-4">{lesson?.videoTitle}</p>
            {lesson?.videoURL && (
              <div className="mb-4">
                <video
                  controls
                  className="w-full rounded-lg shadow-lg"
                  src={`http://localhost:8080/uploadsVideo/${lesson.videoURL}`}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() =>
                  navigate(`/dashboard/teacher/lessons/update/${lessonId}`)
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Delete Lesson</h2>
            <p className="mb-4">Are you sure you want to delete this lesson?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(deleteLesson(Number(lessonId)));
                  setShowDeleteModal(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonDetailPage;