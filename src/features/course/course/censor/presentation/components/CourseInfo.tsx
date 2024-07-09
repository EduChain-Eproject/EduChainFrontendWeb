import React from 'react';
import Course from '../../domain/entities/Course';

interface CourseInfoProps {
    course: Course;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ course }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
            <p className="text-gray-700">{course.description}</p>
            <div className="mt-4 flex justify-between items-center">
                <p className="text-gray-700">Price: {course.price}</p>
                <p className="text-gray-700">Status: {course.status}</p>
            </div>
        </div>
    );
};

export default CourseInfo;
