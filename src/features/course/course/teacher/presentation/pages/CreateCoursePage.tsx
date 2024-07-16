import React, { useEffect } from 'react';

import CourseForm from '../components/CourseForm';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { RouteObject, useNavigate } from 'react-router-dom';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import {
  createCourse,
  CreateCourseReq,
} from '../../data/services/handleCreateCourse';
import { fetchListCategories } from '../../data/services/handleGetListCategories';

export const route: () => RouteObject = () => {
  return {
    path: 'courses/create',
    element: <CreateCoursePage />,
  };
};

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
    label: 'Create Course',
    href: '/dashboard/teacher/course/create',
  },
];

const CreateCoursePage: React.FC = () => {
  const { status, error } = useAppSelector(
    (state) => state.courses.teacher.createCoursePage,
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (data: CreateCourseReq) => {
    const categoryIds = Object.keys(data.categoryIds)
      .filter((key) => data.categoryIds[key])
      .map((key) => parseInt(key, 10));

    const submitData = {
      ...data,
      categoryIds,
    };

    dispatch(createCourse(submitData));

    if (status === 'succeeded') {
      navigate('/teacher/courses');
    }
  };

  useEffect(() => {
    dispatch(fetchListCategories());
  }, [dispatch]);

  return (
    <div>
      <AppBreadcrumb items={breadCrumbItems} />
      <CourseForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateCoursePage;
