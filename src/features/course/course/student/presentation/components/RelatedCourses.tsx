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
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
      <div className="flex flex-col space-y-6">
        {relatedCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={course.avatarPath}
              alt={course.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4 truncate">{course.description}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                onClick={() => handleViewCourseDetail(course.id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default RelatedCourses;
