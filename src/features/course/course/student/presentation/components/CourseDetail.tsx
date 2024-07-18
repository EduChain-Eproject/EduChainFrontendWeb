import React from 'react';
import Course from '../../../../../../common/entities/Course';

interface CourseDetailProps {
  course: Course;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Course Details</h2>
      <p>
        <strong>Description:</strong> {course.description}
      </p>
      <p>
        <strong>Price:</strong> ${course.price}
      </p>
      <p>
        <strong>Status:</strong> {course.status}
      </p>
      {course.categoryDtos && (
        <div>
          <h3 className="text-lg font-bold">Categories</h3>
          <ul>
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
