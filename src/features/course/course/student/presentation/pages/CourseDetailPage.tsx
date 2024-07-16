import React, { useEffect, useState } from 'react';
import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import CourseDetail from '../components/CourseDetail';
import Curriculum from '../components/Curriculum';
import Teacher from '../components/Teacher';
import Feedback from '../components/Feedback';
import Enrollment from '../components/Enrollment';
import RelatedCourses from '../components/RelatedCourses';
import { fetchCourseDetail } from '../../data/services/handleGetCourseDetail';

export const route: () => RouteObject = () => {
  return {
    path: ':courseId',
    element: <CourseDetailPage />,
  };
};

const CourseDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useAppDispatch();
  const {
    data: courseData,
    status,
    error,
  } = useAppSelector((state) => state.courses.student.courseDetailPage);

  useEffect(() => {
    dispatch(fetchCourseDetail(Number(courseId)));
  }, [courseId, dispatch]);

  const [activeTab, setActiveTab] = useState<
    'detail' | 'curriculum' | 'teacher' | 'feedback'
  >('detail');
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  const breadCrumbItems = [
    { label: 'Home', href: '' },
    { label: 'Courses', href: '/courses' },
    { label: `Courses ${courseData?.title}`, href: `/courses/${courseId}` },
  ];

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const handleLessonClick = (lessonId: number) => {
    if (courseData && !courseData.enrolled) {
      setShowEnrollmentModal(true);
    } else {
      navigate(`/courses/${courseId}/lessons/${lessonId}`);
    }
  };

  return (
    <div className="p-4">
      <AppBreadcrumb items={breadCrumbItems} />
      <h1 className="text-2xl font-bold mb-4">{courseData?.title}</h1>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('detail')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'detail' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Detail
        </button>
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'curriculum'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
          }`}
        >
          Curriculum
        </button>
        <button
          onClick={() => setActiveTab('teacher')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'teacher' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Teacher
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'feedback' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Feedback
        </button>
      </div>
      {activeTab === 'detail' && courseData && (
        <CourseDetail course={courseData} />
      )}
      {activeTab === 'curriculum' && courseData && (
        <Curriculum
          chapters={courseData.chapterDtos}
          onLessonClick={handleLessonClick}
        />
      )}
      {activeTab === 'teacher' && courseData?.teacherDto && (
        <Teacher
          teacher={courseData.teacherDto} //  teacher={courseData.teacher}
        />
      )}{' '}
      {activeTab === 'feedback' && courseData && (
        <Feedback feedbacks={courseData.courseFeedbacks} />
      )}
      {showEnrollmentModal && !courseData?.enrolled && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Enroll in Course</h2>
            <p className="mb-4">
              You need to enroll in this course to access the lesson.
            </p>
            {courseData && <Enrollment course={courseData} />}
            <button
              onClick={() => setShowEnrollmentModal(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {courseData && <Enrollment course={courseData} />}
      {courseData?.relatedCourseDtos &&
        courseData.relatedCourseDtos.length > 0 && (
          <RelatedCourses relatedCourses={courseData.relatedCourseDtos} />
        )}
    </div>
  );
};

export default CourseDetailPage;
