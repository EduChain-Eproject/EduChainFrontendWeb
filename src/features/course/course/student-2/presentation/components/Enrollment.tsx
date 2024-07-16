import React from 'react';
import { useAppDispatch } from '../../../../../../common/context/store';
import Course from '../../domain/entities/Course';
import { enrollACourse } from '../redux/courseActions';

interface EnrollmentProps {
  course: Course;
}

const Enrollment: React.FC<EnrollmentProps> = ({ course }) => {
  const dispatch = useAppDispatch();

  function handleEnrollCourse(id: number) {
    dispatch(enrollACourse(id));
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Enrollment</h2>
      <p>
        <strong>Price:</strong> ${course.price}
      </p>
      <p>
        <strong>Number of Enrolled Students:</strong>{' '}
        {course.numberOfEnrolledStudents}
      </p>
      <button onClick={() => handleEnrollCourse(course.id)}>Enroll</button>
    </div>
  );
};

export default Enrollment;
