import React from 'react';
import { Link } from 'react-router-dom';
import AppPagination from '../../../../../../common/components/Pagination/AppPagination';
import Course from '../../../../../../common/entities/Course';

interface CourseListProps {
  courses: Course[];
  onViewCourseDetail: (courseId: number) => void;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CourseList: React.FC<CourseListProps> = ({
  courses,
  onViewCourseDetail,
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => {
          console.log(course.avatarPath); // Debugging line
          return (
            <div
              key={course.id}
              className="relative bg-white shadow rounded-lg overflow-hidden cursor-pointer"
              onClick={() => onViewCourseDetail(course.id)}
            >
              <img src={course.avatarPath} alt={course.title} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                {course.status}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-gray-600">{course.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <AppPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default CourseList;