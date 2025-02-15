import React, { useEffect, useState } from 'react';
import { Link, RouteObject, useNavigate, useParams } from 'react-router-dom';
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
  const { data: courseData, status, error } = useAppSelector(
    (state) => state.courses.student.courseDetailPage
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCourseDetail(Number(courseId)));
  }, [courseId, dispatch]);

  const [activeTab, setActiveTab] = useState<'detail' | 'curriculum' | 'certification'>('detail');
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  const breadCrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: courseData?.title || 'Course Detail', href: `/courses/${courseId}` },
  ];

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  const handleLessonClick = (lessonId: number) => {
    if (courseData && !courseData.currentUserCourse) {
      setShowEnrollmentModal(true);
    } else {
      navigate(`/courses/${courseId}/lessons/${lessonId}`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <AppBreadcrumb items={breadCrumbItems} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="flex items-center mb-4">
            <h1 className="text-3xl font-bold">{courseData?.title}</h1>
            {courseData?.currentUserCourse ? (
              <span className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
                Enrolled
              </span>
            ) : (
              <span className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg">
                Not Enrolled
              </span>
            )}
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('detail')}
              className={`px-6 py-3 rounded-md ${activeTab === 'detail' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
            >
              Detail
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`px-6 py-3 rounded-md ${activeTab === 'curriculum' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
            >
              Curriculum
            </button>
            {courseData?.currentUserCourse?.certificationDto && (
              <button
                onClick={() => setActiveTab('certification')}
                className={`px-6 py-3 rounded-md ${activeTab === 'certification' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
              >
                Certification
              </button>
            )}
          </div>
          {activeTab === 'detail' && courseData && (
            <CourseDetail course={courseData} />
          )}
          {activeTab === 'curriculum' && courseData && (
            <Curriculum
              chapters={courseData.chapterDtos ?? []}
              onLessonClick={handleLessonClick}
            />
          )}
          {activeTab == 'certification' && courseData?.currentUserCourse?.certificationDto && (
            <div>
              {!user?.walletAddress ? (
                <div className='flex flex-col justify-center items-center'>
                  <p>You have to link your wallet to be certified!</p>
                  <button className=' bg-meta-5 px-5 py-3 rounded-xl text-white hover:bg-meta-3'><Link to={'/profile'}>Connect Wallet</Link></button>
                </div>
              ) : (
                <div>
                  {courseData.currentUserCourse.certificationDto.status === 'PENDING' ? (
                    <p>Waiting for teacher to certify</p>
                  ) : courseData.currentUserCourse.certificationDto.status === 'REJECTED' ? (
                    <p>Teacher rejected your certification</p>
                  ) : (
                    <div className='flex flex-col items-start justify-start'>
                      <p>Congratulations! You have been certified</p>
                      <p>NFT Token ID: {courseData.currentUserCourse.certificationDto.nftTokenId}</p>
                      <span>
                        Transaction Hash:
                        <a onClick={() => {
                          if (courseData?.currentUserCourse?.certificationDto?.transactionHash) {
                            window.open(`https://sepolia.etherscan.io/tx/${courseData.currentUserCourse.certificationDto.transactionHash}`, '_blank');
                          }
                        }} className="text-blue-500 hover:underline">
                          {courseData?.currentUserCourse?.certificationDto?.transactionHash}
                        </a>
                      </span>
                      <button className=' rounded-xl bg-meta-5 p-3 text-white'>
                        <Link to={`/certification/${courseData.currentUserCourse.certificationDto.id}`} >See detail</Link>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {courseData?.relatedCourseDtos && courseData.relatedCourseDtos.length > 0 && (
          <div className="lg:col-span-4 mt-6 lg:mt-0">
            <RelatedCourses relatedCourses={courseData.relatedCourseDtos} />
          </div>
        )}
      </div>

      {showEnrollmentModal && !courseData?.currentUserCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Enroll in Course</h2>
            <p className="mb-6 text-center text-gray-600">
              You need to enroll in this course to access the lesson.
            </p>
            {courseData && <Enrollment course={courseData} />}
            <button
              onClick={() => setShowEnrollmentModal(false)}
              className="w-full px-4 py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;