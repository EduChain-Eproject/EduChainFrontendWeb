import React, { useEffect, useState } from 'react';
import BlogList from '../../components/BlogList';
import { RouteObject } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { setPage } from '../../redux/blogSlice';
import Pagination from '../../../../../../common/components/Pagination/Pagination';
import { TakeBlogsReq } from '../../../domain/usecases/GetBlogs';
import { fetchBlogs } from '../../redux/blogActions';

export const route: () => RouteObject = () => {
    return {
        path: "blog",
        element: <BlogPage />
    }
}

const BlogPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { totalPages, currentPage } = useAppSelector((state) => 
        state.blogs.pagination);
    const [size, setSize] = useState(5);
    const deleteBlogAction = useAppSelector((state) => state.blogs.deleteBlog);
  const {  blogs,status, error } = useAppSelector((state) => state.blogs);  

    const handlePageChange = (pageNumber: number) => {
        dispatch(setPage(pageNumber));
      };
      useEffect(() => {
        console.log("Effect triggered");
        const req: TakeBlogsReq = {
            page: currentPage,
            size,
            sortBy: "createdAt"
        };
        dispatch(fetchBlogs(req));
    }, [dispatch, currentPage, size]);

    useEffect(() => {
        if(deleteBlogAction.status === 'succeeded'){
            const req:TakeBlogsReq = {
                page:currentPage,
                size,
                sortBy:"createdAt"
            }
            dispatch(fetchBlogs(req));
        }
      },[deleteBlogAction.status])

    return (
        <div>
            <BlogList data={blogs.data!}  />
            <Pagination 
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
        </div>
    );
};

export default BlogPage;
