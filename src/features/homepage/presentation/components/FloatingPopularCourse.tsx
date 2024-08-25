import React from 'react';
import Course from '../../../../common/entities/Course';

interface Props {
  course: Course;
}

const FloatingPopularCourse: React.FC<Props> = ({ course }) => (
  <div className="bg-white shadow-xl rounded-lg p-6 max-w-sm w-full transform transition-transform hover:-translate-y-2 hover:shadow-2xl z-10">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Most Popular Course</h2>
    <div className="space-y-2">
      <h3 className="text-xl font-medium text-gray-900">{course.title}</h3>
      <p className="text-gray-600">{course.description}</p>
    </div>
  </div>
);

export default FloatingPopularCourse;
