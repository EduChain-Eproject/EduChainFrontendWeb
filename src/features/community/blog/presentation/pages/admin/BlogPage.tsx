import React from 'react';
import BlogList from '../../components/BlogList';
import { RouteObject } from 'react-router-dom';

export const route: () => RouteObject = () => {
    return {
        path: "blog",
        element: <BlogPage />
    }
}

const BlogPage: React.FC = () => {
    return (
        <div>
            <BlogList />
        </div>
    );
};

export default BlogPage;
