import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import Course from '../../../../../../common/entities/Course';
import { enrollACourse } from '../../data/services/handleEnrollACourse';

interface EnrollmentProps {
  course: Course;
}

const Enrollment: React.FC<EnrollmentProps> = ({ course }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data } = useAppSelector(
    (state) => state.courses.student.coursePaymentUrl,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleEnrollCourse(id: number) {
    if (isAuthenticated) {
      dispatch(enrollACourse(id));
    } else {
      navigate('/Auth/login');
    }
  }

  useEffect(() => {
    if (data) {
      window.location.href = data;
    }
  }, [data]);

  return (
    <div className="flex p-6 border border-gray-300 rounded-lg bg-white shadow-md">
      {course.avatarPath && (
        <img
          src={course.avatarPath}
          alt={course.title}
          className="w-32 h-32 object-cover rounded-lg mr-6"
        />
      )}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Enrollment</h2>
        <p className="mb-2">
          <strong>Price:</strong> ${course.price}
        </p>
        <p className="mb-4">
          <strong>Number of Enrolled Students:</strong> {course.numberOfEnrolledStudents}
        </p>
        <button
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-300 ease-in-out"
          onClick={() => handleEnrollCourse(course.id)}
        >
          Enroll
        </button>
      </div>
    </div>
  );
};

export default Enrollment;