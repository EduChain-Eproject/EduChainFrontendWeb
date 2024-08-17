import React, { useEffect } from 'react';
import { RouteObject } from 'react-router-dom';
import BlogUIList from '../components/BlogList';
import Pagination from '../../../../../common/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchBlogs, FindAllBlogRequest } from '../../data/redux/action/fetchBlogs';
import { setPage } from '../../data/redux/blogUISlice';

export const route: () => RouteObject = () => {
    return {
        path: "blog_ui",
        element: <BlogUIPage />
    }
}

const BlogUIPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { totalPages, currentPage, } = useAppSelector((state) => state.blogUiSlice.pagination);
    const {data} = useAppSelector((s) => s.blogUiSlice.blogs);

    useEffect(() => {
        const req: FindAllBlogRequest = {
            page: currentPage,
            size: 5,
            sortBy: "createdAt"
        };
        dispatch(fetchBlogs(req));
        console.log(data);
        // dispatch(fetchBlogCategories());
    }, [dispatch, currentPage]);

    const handlePageChange = (pageNumber: number) => {
        dispatch(setPage(pageNumber));
      };

    return (
        <div>
            <BlogUIList
                data={data!}           
            />
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
