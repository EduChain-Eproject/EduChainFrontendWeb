import React from 'react';
import { RouteObject } from 'react-router-dom';
import BlogUIList from '../components/BlogList';
import BlogDetail from '../components/BlogDetail';

export const route: () => RouteObject = () => {
    return {
        path: "blog_ui/:blogId",
        element: <BlogDetailPage />
    }
}

const BlogDetailPage: React.FC = () => {
    return (
        <div>
            <BlogDetail />
        </div>
    );
};

export default BlogDetailPage;
