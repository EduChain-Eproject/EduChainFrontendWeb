import React from 'react';
import { RouteObject } from 'react-router-dom';
import BlogCate from '../../components/BlogCate';

export const route: () => RouteObject = () => {
    return {
        path: "blog_category/:cateId",
        element: <BlogCateDetailPage />
    }
}

const BlogCateDetailPage: React.FC = () => {
    return (
        <div>
            <BlogCate />
        </div>
    );
};

export default BlogCateDetailPage;
