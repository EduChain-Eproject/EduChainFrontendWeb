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
    data: lesson,
    status,
    error,
  } = useAppSelector((state) => state.courses.student.lessonDetailPage);
  const { data } = useAppSelector(
    (state) => state.courses.student.courseDetailPage,
  );

  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  useEffect(() => {
    dispatch(fetchLessonDetail(Number(lessonId)));
  }, [lessonId, dispatch]);

  useEffect(() => {
    dispatch(fetchCourseDetail(Number(courseId)));
  }, [lessonId, dispatch]);

  const breadCrumbItems = [
    { label: 'Home', href: '' },
    { label: 'Courses', href: '/courses' },
    { label: `Courses ${data?.title}`, href: `/courses/${courseId}` },
    {
      label: `Lesson ${lesson?.lessonTitle}`,
      href: `/courses/${courseId}/lesson/${lessonId}`,
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
      <div className="flex flex-row justify-between">
        {data?.chapterDtos && (
          <Curriculum
            chapters={data?.chapterDtos}
            onLessonClick={(id) => {
              if (data && !data.enrolled) {
                setShowEnrollmentModal(true);
              } else {
                navigate(`/courses/${courseId}/lessons/${id}`);
              }
            }}
          />
        )}
        <div className="flex flex-1 bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Lesson Detail</h1>
          {true && <button>Take the test</button>}
          {true && <button>View your test</button>}
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
            {/* Render other properties */}
          </div>
        </div>
        {showEnrollmentModal && !data?.enrolled && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
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
