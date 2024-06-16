import React from 'react';
import CourseList from '../components/CourseList';
import { RouteObject } from 'react-router-dom';

export const route: () => RouteObject = () => {
    return {
        path: "course",
        element: <CoursePage />
    }
}

const CoursePage: React.FC = () => {
    return (
        <div>
            <CourseList />
        </div>
    );
};

export default CoursePage;
