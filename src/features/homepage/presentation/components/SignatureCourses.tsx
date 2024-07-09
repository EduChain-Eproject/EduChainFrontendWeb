import React from 'react';
import { Course } from '../../data/models/Course';

interface Props {
    courses: Course[];
}

const SignatureCourses: React.FC<Props> = ({ courses }) => (
    <div className="signature-courses py-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Signature Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map(course => (
                <div key={course.id} className="course-card p-6 bg-white shadow-lg rounded-lg transform transition hover:-translate-y-1">
                    <h3 className="text-2xl mb-2">{course.title}</h3>
                    <p className="text-gray-700 mb-2">{course.description}</p>
                    <span className="text-gray-500">${course.price}</span>
                </div>
            ))}
        </div>
    </div>
);

export default SignatureCourses;
