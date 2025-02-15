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
    <div className="p-3 border-blue-400 rounded-lg bg-blue-300">
      <h2 className="text-xl font-bold">Enrollment</h2>
      <p>
        <strong>Price:</strong> ${course.price}
      </p>
      <p>
        <strong>Number of Enrolled Students:</strong>{' '}
        {course.numberOfEnrolledStudents}
      </p>
      <button
        className="px-3 py-1 rounded-lg bg-green-400 hover:bg-green-700"
        onClick={() => handleEnrollCourse(course.id)}
      >
        Enroll
      </button>
    </div>
  );
};

export default Enrollment;
