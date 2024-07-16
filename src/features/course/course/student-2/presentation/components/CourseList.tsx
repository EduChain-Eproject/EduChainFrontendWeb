import React from 'react';
import { Link } from 'react-router-dom';
import Course from '../../domain/entities/Course';
import AppPagination from '../../../../../../common/components/Pagination/AppPagination';

interface CourseListProps {
    courses: Course[];
    onViewCourseDetail: (courseId: number) => void;
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onViewCourseDetail, totalPages, currentPage, onPageChange }) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map(course => (
                    <div key={course.id} className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-lg font-semibold">{course.title}</h2>
                        <p>{course.description}</p>
                        <div className="mt-2 flex justify-end">
                            <button
                                onClick={() => onViewCourseDetail(course.id)}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-2"
                            >
                                View Detail
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <AppPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default CourseList;
