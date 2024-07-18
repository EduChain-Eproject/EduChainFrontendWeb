import React, { useEffect, useState } from 'react';
import { CreateBlogReq } from '../../data/redux/action/createBlog';
import { useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchBlogCategories } from '../../data/redux/action/fetchCategories';
import { BlogCategory } from '../../data/model/BlogCategory';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

interface CreateBlogFormProps {
    onSubmit: (data: CreateBlogReq) => Promise<void>;
}

const CreateBlogForm: React.FC<CreateBlogFormProps> = ({ onSubmit }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { data: blogCategories, status } = useAppSelector((state) => state.blogUiSlice.blogCategories);

    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState(2);
    const [blogCategoryId, setBlogCategoryId] = useState(0);
    const [blogText, setBlogText] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        dispatch(fetchBlogCategories());
    }, [dispatch]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const blogData: CreateBlogReq = {
            title,
            userId,
            blogCategoryId,
            blogText,
            photo
        };
        try {
            await onSubmit(blogData);
            setModalMessage('Blog created successfully!');
            setModalType('success');
            setShowModal(true);
            setTimeout(() => {
                navigate('/community/blog_ui');
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            setModalMessage('Failed to create blog. Please try again.');
            setModalType('error');
            setShowModal(true);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setPhoto(event.target.files[0]);
        }
    };

    return (
        <>
            {showModal && <Modal type={modalType} message={modalMessage} />}
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
                <h2 className="text-2xl font-bold mb-6 text-center">Create New Blog</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
                        User ID
                    </label>
                    <input
                        type="number"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blogCategoryId">
                        Blog Category
                    </label>
                    <select
                        id="blogCategoryId"
                        value={blogCategoryId}
                        onChange={(e) => setBlogCategoryId(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value={0}>Select a category</option>
                        {blogCategories && blogCategories.map((category: BlogCategory) => (
                            <option key={category.id} value={category.id}>{category.categoryName}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blogText">
                        Blog Text
                    </label>
                    <textarea
                        id="blogText"
                        value={blogText}
                        onChange={(e) => setBlogText(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                        Photo
                    </label>
                    <input
                        type="file"
                        id="photo"
                        onChange={handleFileChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateBlogForm;
