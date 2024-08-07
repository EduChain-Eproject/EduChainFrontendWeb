import React, { useEffect } from 'react';
import CourseForm from '../components/CourseForm';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { RouteObject, useNavigate } from 'react-router-dom';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import { createCourse } from '../../data/services/handleCreateCourse';
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

  const handleSubmit = (data: FormData) => {
    dispatch(createCourse(data));
  };

  useEffect(() => {
    dispatch(fetchListCategories());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'create course succeeded') {
      navigate('/dashboard/teacher/courses');
    }
  }, [status, navigate]);

  return (
    <div>
      <AppBreadcrumb items={breadCrumbItems} />
      <CourseForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateCoursePage;
