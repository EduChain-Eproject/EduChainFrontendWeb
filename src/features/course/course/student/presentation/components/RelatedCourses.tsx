import React from 'react';
import Course from '../../../../../../common/entities/Course';
import { useNavigate } from 'react-router-dom';

interface RelatedCoursesProps {
  relatedCourses: Course[];
}

const RelatedCourses: React.FC<RelatedCoursesProps> = ({ relatedCourses }) => {
  const navigate = useNavigate();

  const handleViewCourseDetail = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Related Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedCourses.map((course) => (
          <div key={course.id} className=" bg-slate-300 p-4 rounded-lg">
            <h3 className="text-lg font-bold">{course.title}</h3>
            <p className="text-sm">{course.description}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => handleViewCourseDetail(course.id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;
