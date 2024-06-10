import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchBlog, fetchBlogs } from '../redux/blogActions';

const BlogList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { blogs, status, error } = useAppSelector((state) => state.blogs);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Title</th>
                        <th>PostBy</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs?.map((bl: any) => (
                        <tr key={bl.id}>
                            <td>{bl.id}</td>
                            <td>{bl.title}</td>
                            <td>{bl.userId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1>Courses</h1>
            <ul>
                {blogs?.map((bl: any) => (
                    <li key={bl.id}>{bl.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
