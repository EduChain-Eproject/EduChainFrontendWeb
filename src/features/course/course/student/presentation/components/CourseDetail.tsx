import React from 'react';
import Course from '../../../../../../common/entities/Course';

interface CourseDetailProps {
  course: Course;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">{course.title}</h2>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          src={course.avatarPath}
          alt={course.title}
          className="w-full md:w-1/3 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex-1">
          <p className="mb-4">
            <strong className="font-semibold text-lg">Description:</strong> {course.description}
          </p>
          <p className="mb-4">
            <strong className="font-semibold text-lg">Price:</strong> ${course.price.toFixed(2)}
          </p>
          <p className="mb-4">
            <strong className="font-semibold text-lg">Status:</strong> {course.status}
          </p>
          {course.categoryDtos && (
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">Categories</h3>
              <ul className="list-disc ml-5 text-lg">
                {course.categoryDtos.map((category) => (
                  <li key={category.id}>{category.categoryName}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;