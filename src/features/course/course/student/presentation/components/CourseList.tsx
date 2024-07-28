import React from 'react';
import { Link } from 'react-router-dom';
import Course from '../../../../../../common/entities/Course';
import AppPagination from '../../../../../../common/components/Pagination/AppPagination';
import { useAppSelector } from '../../../../../../common/context/store';

interface CourseListProps {
  onViewCourseDetail: (courseId: number) => void;
}

const CourseList: React.FC<CourseListProps> = ({ onViewCourseDetail }) => {
  const { data, status, error } = useAppSelector(
    (state) => state.courses.student.listCoursesPage,
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.courses?.content.map((course) => (
          <div key={course.id} className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold">{course.title}</h2>
            <p>{course.description}</p>
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => onViewCourseDetail(course.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-2"
              >
                View Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
