import React, { useEffect, useState, useCallback } from 'react';
import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import FilterBar from '../components/FilterBar';
import CourseList from '../components/CourseList';
import {
  CourseSearchParams,
  searchCourses,
} from '../../data/services/handleGetListCourses';
import { fetchListCategories } from '../../data/services/handleGetListCategories';

export const route: () => RouteObject = () => {
  return {
    path: '',
    element: <CoursesListPage />,
  };
};

const CoursesListPage: React.FC = () => {
  const navigate = useNavigate();

  const breadCrumbItems = [
    { label: 'Home', href: '' },
    { label: 'Courses', href: '/courses' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4">
      <AppBreadcrumb items={breadCrumbItems} />
      <FilterBar />
      <br/>
      
      <CourseList
        onViewCourseDetail={(courseId) => {
          navigate(`/courses/${courseId}`);
        }}
      />
    </div>
  );
};

export default CoursesListPage;
