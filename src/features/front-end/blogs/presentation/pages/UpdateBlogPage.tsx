import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../../../common/context/store';
import { useAppSelector } from '../../../../../common/context/store';
import { CreateBlogReq, createBlog } from '../../data/redux/action/createBlog';
import { RouteObject, useNavigate } from 'react-router-dom';
import AppBreadcrumb from '../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import { UpdateBlogReq, updateBlog } from '../../data/redux/action/updateBlog';
import UpdateBlogForm from '../components/UpdateBlogForm';

export const route: () => RouteObject = () => {
    return {
        path: "blog_ui/edit/:blogId",
        element: <UpdateBlogPage />
    }
}

const breadCrumbItems = [
    {
        label: "Home", href: "/dashboard/teacher",
    },
    {
        label: "Your Blogs", href: "/dashboard/teacher/blogs",
    },
    {
        label: "Create Blog", href: "/dashboard/teacher/blog/create",
    },
]

const UpdateBlogPage: React.FC = () => {
    const { status, error } = useAppSelector(state => state.blogUiSlice.blogDetail);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (data: UpdateBlogReq): Promise<void> => {
        const submitData = {
            ...data,
        };
    
        await dispatch(updateBlog(submitData));
    
        if (status === 'succeeded') {
            navigate('/teacher/blogs');
        }
    };

    return (
        <div>
            <AppBreadcrumb items={breadCrumbItems} />
            <UpdateBlogForm {...{onSubmit: handleSubmit}} />
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && <p>Blog created successfully!</p>}
            {status === 'failed' && <p>Error: {error}</p>}
        </div>
    );
};

export default UpdateBlogPage;
