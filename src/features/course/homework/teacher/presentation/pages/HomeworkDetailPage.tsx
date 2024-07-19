import React, { useEffect } from 'react';

import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { homeworkDeleted } from '../../../../lesson/teacher/data/redux/lessonSlice';
import { deleteHomework } from '../../data/services/deleteHomework';
import { getHomeworkDetail } from '../../data/services/getHomeworkDetail';
import QuestionList from '../components/QuestionList';
import UserHomeworkList from '../components/UserHomeworkList';

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

  useEffect(() => {
    if (homeworkId) {
      dispatch(getHomeworkDetail(Number(homeworkId)));
    }
  }, [homeworkId, dispatch]);

  const handleDelete = (homeworkId: number) => {
    if (window.confirm('Are you sure you want to delete this homework?')) {
      dispatch(deleteHomework(homeworkId)).then(() =>
        navigate(`/dashboard/teacher/lessons/${homework?.lessonDto?.id}`),
      );
    }
  };

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <AppBreadcrumb items={breadCrumbItems} />
      <h1 className="text-2xl font-bold mb-4">Homework Detail</h1>

      {homework && (
        <>
          <h2 className="text-xl font-semibold">{homework.title}</h2>
          <p>{homework.description}</p>
          <div className="space-x-2 mt-2">
            <button
              onClick={() =>
                navigate(`/dashboard/teacher/homeworks/update/${homework.id}`)
              }
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(homework.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-start">
            {homework.userHomeworkDtos && (
              <div className="flex-1 p-4 border rounded overflow-hidden">
                <div className="overflow-y-auto h-full">
                  <UserHomeworkList
                    userHomeworks={homework.userHomeworkDtos}
                    homeworkId={homework.id}
                  />
                </div>
              </div>
            )}
            {homework.questionDtos && (
              <div className="flex-1 p-4 border rounded overflow-hidden ml-4">
                <div className="overflow-y-auto h-full">
                  <QuestionList
                    questions={homework.questionDtos}
                    handleClickQuestion={() =>
                      navigate(
                        `/dashboard/teacher/questions/create/homework/${homeworkId}/`,
                      )
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeworkDetailPage;
