import React from 'react';
import Course from '../../../../../../common/entities/Course';
import CategoryList from './CategoryList';

interface CourseInfoProps {
  course: Course;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ course }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row items-center">
        {course.avatarPath && (
          <img
            src={course.avatarPath}
            alt={course.title}
            className="w-full md:w-1/3 h-48 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
          />
        )}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">{course.title}</h2>
          <p className="text-gray-700 mb-4">{course.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Price: ${course.price}</p>
            <p className="text-lg font-semibold text-gray-700">Status: {course.status}</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <CategoryList categories={course.categoryDtos} />
      </div>
    </div>
  );
};

export default CourseInfo;