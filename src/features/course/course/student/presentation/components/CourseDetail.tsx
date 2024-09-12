import React from 'react';
import Course from '../../../../../../common/entities/Course';

interface CourseDetailProps {
  course: Course;
}

const CourseDetail: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Details</h2>
      <p className="mb-2">
        <strong className="font-semibold">Description:</strong> {course.description}
      </p>
      <p className="mb-2">
        <strong className="font-semibold">Price:</strong> ${course.price.toFixed(2)}
      </p>
      {course.categoryDtos && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Categories</h3>
          <ul className="list-disc ml-5">
            {course.categoryDtos.map((category) => (
              <li key={category.id}>{category.categoryName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
