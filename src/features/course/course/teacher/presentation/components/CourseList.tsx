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
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">Courses</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {courses.map((course) => (
          <li key={course.id} className="py-4 flex items-start space-x-4">
            <img
              src={course.avatarPath}
              alt={course.title}
              className="w-24 h-24 object-cover rounded-lg border border-gray-300"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
              <p className="text-gray-600">{course.description}</p>
              <div className="flex items-center space-x-4 mt-2">
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
