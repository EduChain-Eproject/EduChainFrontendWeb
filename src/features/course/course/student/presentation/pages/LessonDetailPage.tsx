import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import React, { useEffect, useState } from 'react';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import Curriculum from '../components/Curriculum';
import Enrollment from '../components/Enrollment';
import { fetchLessonDetail } from '../../data/services/handleGetLessonDetail';
import { fetchCourseDetail } from '../../data/services/handleGetCourseDetail';
import HomeworkDetail from '../components/homeworks/HomeworkDetail';

export const route: () => RouteObject = () => {
  return {
    path: ':courseId/lessons/:lessonId',
    element: <LessonDetailPage />,
  };
};

const LessonDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { lessonId, courseId } = useParams<{
    lessonId: string;
    courseId: string;
  }>();
  const dispatch = useAppDispatch();
  const {
    data: lesson, // lesson is Lesson | undefined type
    status,
    error,
  } = useAppSelector((state) => state.courses.student.lessonDetailPage);
  const { data } = useAppSelector(
    (state) => state.courses.student.courseDetailPage,
  );

  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [showHomeworks, setShowHomeworks] = useState(false);
  const [selectedHomeworkId, setSelectedHomeworkId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    dispatch(fetchLessonDetail(Number(lessonId)));
  }, [lessonId, dispatch]);

  useEffect(() => {
    dispatch(fetchCourseDetail(Number(courseId)));
  }, [courseId, dispatch]);

  const breadCrumbItems = [
    { label: 'Home', href: '' },
    { label: 'Courses', href: '/courses' },
    { label: `Course ${data?.title}`, href: `/courses/${courseId}` },
    {
      label: `Lesson ${lesson?.lessonTitle}`,
      href: `/courses/${courseId}/lessons/${lessonId}`,
    },
  ];

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4">
      <AppBreadcrumb items={breadCrumbItems} />
      <div className="flex justify-between">
        {data?.chapterDtos && (
          <Curriculum
            chapters={data?.chapterDtos}
            onLessonClick={(id) => {
              if (data && !data.currentUserCourse) {
                setShowEnrollmentModal(true);
              } else {
                navigate(`/courses/${courseId}/lessons/${id}`);
              }
            }}
          />
        )}
        <div className="flex flex-1 flex-col bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Lesson Detail</h1>
          <button
            onClick={() => setShowHomeworks((prev) => !prev)}
            className="text-blue-500 underline"
          >
            {showHomeworks ? 'Hide Homeworks' : 'View Homeworks'}
          </button>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{lesson?.lessonTitle}</h2>
            <p>{lesson?.description}</p>
            <h3 className="text-lg font-medium mt-2">Video</h3>
            <p>{lesson?.videoTitle}</p>
            <a
              href={lesson?.videoURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {lesson?.videoURL}
            </a>
          </div>
          {showHomeworks && (
            <div className="mt-4">
              <h2 className="text-xl font-bold">Homeworks</h2>
              {lesson?.homeworkDtos?.map((homework) => (
                <div key={homework.id} className="mb-2">
                  <button
                    onClick={() => setSelectedHomeworkId(homework.id)}
                    className="text-blue-500 underline"
                  >
                    {homework.title}
                  </button>
                </div>
              ))}
              {selectedHomeworkId && (
                <HomeworkDetail homeworkId={selectedHomeworkId} />
              )}
            </div>
          )}
        </div>
        {showEnrollmentModal && !data?.currentUserCourse && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-bold mb-4">Enroll in Course</h2>
              <p className="mb-4">
                You need to enroll in this course to access the lesson.
              </p>
              {data && <Enrollment course={data} />}
              <button
                onClick={() => setShowEnrollmentModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
