import React from 'react';
import Course from '../../domain/entities/Course';

interface EnrollmentProps {
    course: Course;
}

const Enrollment: React.FC<EnrollmentProps> = ({ course }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">Enrollment</h2>
            <p><strong>Price:</strong> ${course.price}</p>
            <p><strong>Number of Enrolled Students:</strong> {course.numberOfEnrolledStudents}</p>
            <button>Enroll</button>
        </div>
    );
};

export default Enrollment;
