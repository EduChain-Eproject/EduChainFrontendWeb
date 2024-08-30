import React from 'react';
import Course from '../../../../common/entities/Course';

interface Props {
  courses: Course[];
}

const SignatureCourses: React.FC<Props> = ({ courses }) => {
  return (
    <div className="signature-courses py-8 px-4 md:px-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">Signature Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.slice(0, 2).map((course) => (
          <div
            key={course.id}
            className="course-card p-6 bg-gradient-to-r from-blue-400 via-teal-500 to-green-400 text-white shadow-xl rounded-lg transform transition hover:scale-105 hover:shadow-2xl flex flex-col items-center"
          >
            <h3 className="text-2xl font-bold mb-2 text-center">{course.title}</h3>
            <p className="text-gray-200 mb-3 text-center text-sm">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignatureCourses;