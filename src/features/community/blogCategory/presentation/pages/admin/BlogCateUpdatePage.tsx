import React from 'react';
import { RouteObject } from 'react-router-dom';
import BlogCateUpdate from '../../components/BlogCateUpdate';

export const route: () => RouteObject = () => {
    return {
        path: "blog_category/edit/:cateId",
        element: <BlogCateUpdate />
    }
}

const BlogCateUpdatePage: React.FC = () => {
    return (
        <div>
            <BlogCateUpdate />
        </div>
    );
};

export default BlogCateUpdatePage;
