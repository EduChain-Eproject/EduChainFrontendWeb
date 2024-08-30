import React, { useEffect } from 'react';
import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { deleteHomework } from '../../data/services/deleteHomework';
import { getHomeworkDetail } from '../../data/services/getHomeworkDetail';
import QuestionList from '../components/QuestionList';
import UserHomeworkList from '../components/UserHomeworkList';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const route: () => RouteObject = () => {
  return {
    path: 'homeworks/:homeworkId/',
    element: <HomeworkDetailPage />,
  };
};

const HomeworkDetailPage: React.FC = () => {
  const { homeworkId } = useParams<{ homeworkId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    status,
    error,
    data: homework,
  } = useAppSelector((state) => state.homeworks.teacher.homeworkDetailPage);

  useEffect(() => {
    dispatch(getHomeworkDetail(Number(homeworkId)));
  }, [homeworkId, dispatch]);

  const breadCrumbItems = [
    { label: 'Home', href: '/dashboard/teacher' },
    { label: 'Course by you', href: '/dashboard/teacher/courses' },
    {
      label: `Course ${homework?.lessonDto?.chapterDto?.courseDto?.title}`,
      href: `/dashboard/teacher/courses/${homework?.lessonDto?.chapterDto?.courseDto?.id}`,
    },
    {
      label: `Chapter ${homework?.lessonDto?.chapterDto?.chapterTitle}`,
      href: `/dashboard/teacher/chapters/${homework?.lessonDto?.chapterDto?.id}`,
    },
    {
      label: `Lesson ${homework?.lessonDto?.lessonTitle}`,
      href: `/dashboard/teacher/lessons/${homework?.lessonDto?.id}`,
    },
    {
      label: `Homework ${homework?.title}`,
      href: `/dashboard/teacher/homeworks/${homeworkId}`,
    },
  ];

  const handleDelete = (homeworkId: number) => {
    if (window.confirm('Are you sure you want to delete this homework?')) {
      dispatch(deleteHomework(homeworkId)).then(() =>
        navigate(`/dashboard/teacher/lessons/${homework?.lessonDto?.id}`),
      );
    }
  };

  if (status === 'failed') {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="mx-auto max-w-5xl p-4 bg-white rounded-lg shadow-lg">
        <AppBreadcrumb items={breadCrumbItems} />
        <h1 className="text-3xl font-bold mb-6">Homework Detail</h1>

        {homework && (
          <>
            <h2 className="text-2xl font-semibold mb-4">{homework.title}</h2>
            <p className="mb-6">{homework.description}</p>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() =>
                  navigate(`/dashboard/teacher/homeworks/update/${homework.id}`)
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
              >
                <FaEdit className="mr-2" /> Update
              </button>
              <button
                onClick={() => handleDelete(homework.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-6">
              {homework.userHomeworkDtos && (
                <div className="flex-1 p-4 bg-gray-50 rounded-lg">
                  <UserHomeworkList
                    userHomeworks={homework.userHomeworkDtos}
                    homeworkId={homework.id}
                  />
                </div>
              )}
              {homework.questionDtos && (
                <div className="flex-1 p-4 bg-gray-50 rounded-lg mt-6 md:mt-0">
                  <QuestionList
                    questions={homework.questionDtos}
                    handleClickQuestion={() =>
                      navigate(
                        `/dashboard/teacher/questions/create/homework/${homeworkId}/`,
                      )
                    }
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeworkDetailPage;