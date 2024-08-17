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
        <div className="flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PostBy</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {blogs.data?.map((bl: any) => (
                            <tr key={bl.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{bl.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{bl.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{bl.userId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
    );
};

export default BlogList;
