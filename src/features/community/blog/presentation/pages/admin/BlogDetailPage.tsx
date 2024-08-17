import React from 'react'
import { RouteObject } from 'react-router-dom';
import BlogDetailPageComp from '../../components/BlogDetailPageComp';

export const route: () => RouteObject = () => {
    return {
        path: "blog_ui_adminview/:blogId",
        element: <BlogDetailPage />
    }
}

const BlogDetailPage: React.FC = () => {
    return (
        <div>
            <BlogDetailPageComp />
        </div>
    );
};

export default BlogDetailPage;