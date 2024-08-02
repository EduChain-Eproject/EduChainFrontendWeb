import React from 'react';
import { RouteObject } from 'react-router-dom';
import BlogUIList from '../components/BlogList';

export const route: () => RouteObject = () => {
    return {
        path: "blog_ui",
        element: <BlogUIPage />
    }
}

const BlogUIPage: React.FC = () => {
    return (
        <div>
            <BlogUIList />
        </div>
    );
};

export default BlogUIPage;
