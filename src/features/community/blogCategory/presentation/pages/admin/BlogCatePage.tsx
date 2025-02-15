import React from 'react';
import BlogCateList from '../../components/BlogCateList';
import { RouteObject } from 'react-router-dom';

export const route: () => RouteObject = () => {
    return {
        path: "blog_category",
        element: <BlogCatePage />
    }
}

const BlogCatePage: React.FC = () => {
    return (
        <div>
            <BlogCateList />
        </div>
    );
};

export default BlogCatePage;
