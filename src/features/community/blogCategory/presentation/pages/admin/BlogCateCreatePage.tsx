import React from 'react';
import { RouteObject } from 'react-router-dom';
import BlogCateCreate from '../../components/BlogCateCreate';

export const route: () => RouteObject = () => {
    return {
        path: "blog_category/create",
        element: <BlogCateCreate />
    }
}

const BlogCateCreatePage: React.FC = () => {
    return (
        <div>
            <BlogCateCreate />
        </div>
    );
};

export default BlogCateCreatePage;
