import React from 'react';
import CourseDetail from '../../components/CourseDetail';
import { RouteObject } from 'react-router-dom';


export const route: () => RouteObject = () => {

    return {
        path: "course/:courseId",
        element: <CourseDetailPage />
    }
}

const CourseDetailPage: React.FC = () => {
    return (
        <div>
            <CourseDetail />
        </div>
    );
};

export default CourseDetailPage;
