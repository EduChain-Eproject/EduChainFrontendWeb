import React, { useEffect, useState } from 'react';
import CourseList from '../components/CourseList';
import { RouteObject } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { fetchCoursesByTeacher } from '../redux/courseActions';
import FilterBar from '../components/FilterBar';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import { GetCoursesByTeacherRequest } from '../../data/services/handleGetCourseByTeacher';

export const route: () => RouteObject = () => {
  return {
    path: 'courses',
    element: <CoursesPage />,
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
];

const CoursesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(
    (state) => state.courses.teacher.listCoursesPage,
  );

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    const request: GetCoursesByTeacherRequest = {
      teacherId: 1, // Example teacherId
      search,
      page,
      size,
      sortBy,
    };
    console.log('fetching...');

    dispatch(fetchCoursesByTeacher(request));
  }, [dispatch, search, page, size, sortBy]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const handleUpdateCourse = (courseId: number) => {
    // Navigate to update course page
  };

  const handleViewCourseDetail = (courseId: number) => {
    // Navigate to course detail page
  };

  return (
    <div className="mx-auto max-w-4xl px-4">
      <AppBreadcrumb items={breadCrumbItems} />
      <FilterBar
        search={search}
        setSearch={setSearch}
        page={page}
        setPage={setPage}
        size={size}
        setSize={setSize}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {data && (
        <CourseList
          courses={data}
          onUpdateCourse={handleUpdateCourse}
          onViewCourseDetail={handleViewCourseDetail}
        />
      )}
    </div>
  );
};

export default CoursesPage;
