import React from 'react';
import { Link } from 'react-router-dom';
import Course from '../../../../../../common/entities/Course';

interface CourseListProps {
  courses: Course[];
  onUpdateCourse: (courseId: number) => void;
  onViewCourseDetail: (courseId: number) => void;
}

const CourseList: React.FC<CourseListProps> = ({
  courses,
  onUpdateCourse,
  onViewCourseDetail,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Courses</h2>
      </div>
      <ul className="space-y-4">
        {courses.map((course) => (
          <li key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex">
            <img
              src={course.avatarPath}
              alt={course.title}
              className="w-48 h-48 object-cover rounded-l-lg"
            />
            <div className="p-6 flex-1">
              <h3 className="text-2xl font-bold text-gray-800">{course.title}</h3>
              <p className="text-gray-600 mt-2">{course.description}</p>
              <div className="flex items-center space-x-4 mt-4">
                <Link
                  to={`/dashboard/teacher/courses/${course.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                  onClick={() => onViewCourseDetail(course.id)}
                >
                  View Details
                </Link>
                <Link
                  to={`/dashboard/teacher/courses/${course.id}/update`}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                  onClick={() => onUpdateCourse(course.id)}
                >
                  Update
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;