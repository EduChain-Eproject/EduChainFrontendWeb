import React from 'react';
import { useAppDispatch } from '../../../../../../common/context/store';
import Course from '../../../../../../common/entities/Course';
import { enrollACourse } from '../../data/services/handleEnrollACourse';
interface EnrollmentProps {
  course: Course;
}

const Enrollment: React.FC<EnrollmentProps> = ({ course }) => {
  const dispatch = useAppDispatch();

  function handleEnrollCourse(id: number) {
    dispatch(enrollACourse(id));
  }

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
