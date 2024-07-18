import React from 'react';
import { Course } from '../../data/models/Course';

interface Props {
    course: Course;
}

const FloatingPopularCourse: React.FC<Props> = ({ course }) => (
    <div className="floating-course p-6 bg-white shadow-lg rounded-lg transform transition hover:-translate-y-1">
        <h2 className="text-2xl font-bold mb-4">Most Popular Course</h2>
        <div className="course-details">
            <h3 className="text-xl mb-2">{course.title}</h3>
            <p className="text-gray-700">{course.description}</p>
        </div>
    </div>
);

export default FloatingPopularCourse;
