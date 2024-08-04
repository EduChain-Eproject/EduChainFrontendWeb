import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { RouteObject } from 'react-router-dom';
import CourseFormUpdate from '../components/CourseFormUpdate';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import {
  updateCourse,
  UpdateCourseReq,
} from '../../data/services/handleUpdateCourse';
import { fetchCourseDetail } from '../../data/services/handleFetchCourseDetail';
import { fetchListCategories } from '../../data/services/handleGetListCategories';

export const route: () => RouteObject = () => {
  return {
    path: 'courses/:courseId/update',
    element: <UpdateCoursePage />,
  };
};

const UpdateCoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, status, error } = useAppSelector(
    (state) => state.courses.teacher.updateCoursePage,
  );
  const { data: courseDetailData } = useAppSelector(
    (state) => state.courses.teacher.courseDetailPage,
  );

  const breadCrumbItems = [
    {
      label: 'Home',
      href: '/dashboard/teacher',
    },
    {
      label: 'Course by you',
      href: '/dashboard/teacher/courses',
    },
    {
      label: `Update course ${courseDetailData?.title}`,
      href: `/dashboard/teacher/courses/${courseId}/update`,
    },
  ];

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseDetail(Number(courseId)));
    }
  }, [courseId, dispatch]);

  useEffect(() => {
    dispatch(fetchListCategories());
  }, [dispatch]);

  const handleSubmit = (data: UpdateCourseReq) => {
    const categoryIds = Object.keys(data.categoryIds)
      .filter((key) => data.categoryIds[key])
      .map((key) => parseInt(key, 10));

    const submitData = {
      ...data,
      categoryIds,
    };

    if (courseId) {
      dispatch(
        updateCourse({ courseId: Number(courseId), courseData: submitData }),
      );
    }
  };

  useEffect(() => {
    if (status === 'succeeded') {
      console.log('dkmmm ?');

      navigate(`/dashboard/teacher/course/${courseId}`);
    }
  }, [status, navigate, courseId]);

  if (status === 'pending') {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div>
      <AppBreadcrumb items={breadCrumbItems} />
      <div className="text-center mt-4 text-red-500"> {error}</div>;
      <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-4">
        <h2 className="text-2xl font-bold mb-2">Update Course</h2>
        <CourseFormUpdate onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default UpdateCoursePage;
