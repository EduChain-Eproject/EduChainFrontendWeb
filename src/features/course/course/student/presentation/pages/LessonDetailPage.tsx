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
  const { lessonId, courseId } = useParams<{ lessonId: string; courseId: string }>();
  const dispatch = useAppDispatch();
  const { data: lesson, status, error } = useAppSelector(state => state.courses.student.lessonDetailPage);
  const { data } = useAppSelector(state => state.courses.student.courseDetailPage);

  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'lesson' | 'homeworks'>('lesson');
  const [selectedHomeworkId, setSelectedHomeworkId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchLessonDetail(Number(lessonId)));
  }, [lessonId, dispatch]);

  useEffect(() => {
    dispatch(fetchCourseDetail(Number(courseId)));
  }, [courseId, dispatch]);

  const breadCrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: `Course ${data?.title}`, href: `/courses/${courseId}` },
    { label: `Lesson ${lesson?.lessonTitle}`, href: `/courses/${courseId}/lessons/${lessonId}` },
  ];

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-6">
      <div className='mx-auto max-w-5xl p-2 mb-5'>
        <AppBreadcrumb items={breadCrumbItems} />
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        {/* Curriculum Section */}
        {data?.chapterDtos && (
          <div className="lg:w-1/3 mb-6 lg:mb-0">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Curriculum</h2>
              <Curriculum
                chapters={data.chapterDtos}
                onLessonClick={(id) => {
                  if (data && !data.currentUserCourse) {
                    setShowEnrollmentModal(true);
                  } else {
                    navigate(`/courses/${courseId}/lessons/${id}`);
                  }
                }}
              />
            </div>
          </div>
        )}
        {/* Lesson Detail and Homeworks Toggle Section */}
        <div className={`flex-1 bg-white shadow-lg rounded-lg p-6 ${data?.chapterDtos ? 'lg:w-2/3' : 'w-full'}`}>
          <h1 className="text-3xl font-bold mb-4">{lesson?.lessonTitle}</h1>
          <div className="mb-4">
            <button
              onClick={() => setActiveTab('lesson')}
              className={`px-4 py-2 mr-2 rounded-md ${activeTab === 'lesson' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600`}
            >
              Lesson Detail
            </button>
            <button
              onClick={() => setActiveTab('homeworks')}
              className={`px-4 py-2 rounded-md ${activeTab === 'homeworks' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600`}
            >
              Homeworks
            </button>
          </div>
          {activeTab === 'lesson' && (
            <div>
              <p className="text-lg mb-4">{lesson?.description}</p>
              <h2 className="text-xl font-semibold mb-2">Video</h2>
              {lesson?.videoURL && (
                <div className="mb-4">
                  <video
                    controls
                    className="w-full rounded-lg shadow"
                    src={`http://localhost:8080/uploadsVideo/${lesson.videoURL}`}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          )}
          {activeTab === 'homeworks' && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Homeworks</h2>
              {lesson?.homeworkDtos?.map(homework => (
                <div key={homework.id} className="border-b pb-4 mb-4">
                  <button
                    onClick={() => setSelectedHomeworkId(homework.id)}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    {homework.title}
                  </button>
                  <p className="text-gray-700">{homework.description}</p>
                  <p className="text-sm text-gray-500">{homework.questionDtos?.length} questions</p>
                </div>
              ))}
              {selectedHomeworkId && (
                <HomeworkDetail homeworkId={selectedHomeworkId} />
              )}
            </div>
          )}
        </div>
      </div>
      {showEnrollmentModal && !data?.currentUserCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Enroll in Course</h2>
            <p className="mb-4">You need to enroll in this course to access the lesson.</p>
            {data && <Enrollment course={data} />}
            <button
              onClick={() => setShowEnrollmentModal(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonDetailPage;