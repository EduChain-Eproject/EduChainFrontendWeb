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

  if (status === 'loading') {
    return <div className="text-center py-4">Loading courses...</div>;
  }

  if (status === 'error') {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {data?.courses?.content.map((course) => (
          <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img
              src={course.avatarPath}
              alt={`Image for ${course.title}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h2>
              <p className="text-gray-600 line-clamp-3 mb-4">{course.description}</p>
              <div className="flex items-center justify-between text-gray-700 mb-4">
                <span className="text-lg font-semibold">${course.price.toFixed(2)}</span>
                <span className="text-sm">Enrolled: {course.numberOfEnrolledStudents || 0}</span>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => onViewCourseDetail(course.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
