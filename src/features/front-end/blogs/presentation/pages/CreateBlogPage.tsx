import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../../../common/context/store';
import { useAppSelector } from '../../../../../common/context/store';
import { CreateBlogReq, createBlog, resetCreateBlog } from '../../data/redux/action/createBlog';
import { RouteObject, useNavigate } from 'react-router-dom';
import CreateBlogForm from '../components/CreateBlogForm';
import AppBreadcrumb from '../../../../../common/components/Breadcrumbs/AppBreadcrumb';

export const route: () => RouteObject = () => {
    return {
        path: "blog_ui/create",
        element: <CreateNewBlogPage />
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

const CreateNewBlogPage: React.FC = () => {
    const { status, error } = useAppSelector(state => state.blogUiSlice.blogDetail);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const createBlogData = useAppSelector(
        (state) => state.blogUiSlice.blogCreateState,
      );
    const handleSubmit =  (data: CreateBlogReq) => {
        const submitData = {
            ...data,
        };
         dispatch(createBlog(submitData));
    };

  useEffect(() => {
    if(createBlogData.status === 'succeeded'){
      navigate('/community/blog_ui');
      dispatch(resetCreateBlog());
    }
  },[createBlogData.status ,navigate]);
    return (
        <div>
            <AppBreadcrumb items={breadCrumbItems} />
            <CreateBlogForm onSubmit={handleSubmit} />
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && <p>Blog created successfully!</p>}
            {status === 'failed' && <p>Error: {error}</p>}
        </div>
    );
};

export default CreateNewBlogPage;
