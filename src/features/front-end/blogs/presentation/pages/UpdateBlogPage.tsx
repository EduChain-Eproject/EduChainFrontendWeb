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
        label: "Your Blogs", href: "/dashboard/teacher/blogs_ui",
    },
    {
        label: "Create Blog", href: "/dashboard/teacher/blog_ui/create",
    },
]

const UpdateBlogPage: React.FC = () => {
    const { status, error } = useAppSelector(state => state.blogUiSlice.blogDetail);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const blogUpdate = useAppSelector((s)=>s.blogUiSlice.blogUpdate);
    const handleSubmit = async (data: UpdateBlogReq): Promise<void> => {
        const submitData = {
            ...data,
        };
    
        await dispatch(updateBlog(submitData));
    };
    useEffect(() => {
        if(blogUpdate.status === 'succeeded'){
        console.log('ok');
          navigate('/community/blog_ui')
        }
      },[blogUpdate.status])
    return (
        <div>
            <AppBreadcrumb items={breadCrumbItems} />
            <UpdateBlogForm {...{onSubmit: handleSubmit}} />
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
        </div>
    );
};

export default UpdateBlogPage;
