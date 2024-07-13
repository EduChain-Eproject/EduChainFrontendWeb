import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchCates, deleteCate } from '../redux/cateAction';
import { Link } from 'react-router-dom';

const BlogCateList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { cates, status } = useAppSelector((state: RootState) => state.cates);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cateToDelete, setCateToDelete] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchCates());
    }, [dispatch]);

    const openModal = (cateId: number) => {
        setCateToDelete(cateId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCateToDelete(null);
    };

    const confirmDelete = () => {
        if (cateToDelete !== null) {
            dispatch(deleteCate(cateToDelete));
        }
        closeModal();
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <Link to="/dashboard/blog_category/create">
                        <button type="button" className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Create new category
                        </button>
                    </Link>
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created at</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cates?.map((cate: any) => (
                                    <tr key={cate.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{cate.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{cate.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{cate.createdAt}</td>
                                        <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                                            <Link to={`/dashboard/blog_category/${cate.id}`}>
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    Detail
                                                </button>
                                            </Link>
                                            ||
                                            <Link to={`/dashboard/blog_category/edit/${cate.id}`}>
                                                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                                    Edit
                                                </button>
                                            </Link>
                                            ||
                                            <button 
                                                onClick={() => openModal(cate.id)} // Mở modal khi nhấn nút xóa
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-lg max-w-sm mx-auto">
                        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this category?</p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Yes
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogCateList;
