import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchBlogs } from '../../data/redux/action/fetchBlogs';
import { deleteBlog } from '../../data/redux/action/deleteBlog';
import { Blog } from '../../data/model/Blog';
import { ChatIcon, TrashIcon, PencilIcon } from '@heroicons/react/outline';
import { Link, useNavigate } from 'react-router-dom';
import { filterBlog } from '../../data/redux/action/filterBlog';
import { fetchBlogCategories } from '../../data/redux/action/fetchCategories';
import { BlogCategory } from '../../data/model/BlogCategory';
import VoteButton from './VoteButton';

const BlogUIList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { blogs } = useAppSelector((state: RootState) => state.blogUiSlice);
    const { data: blogCategories } = useAppSelector((state) => state.blogUiSlice.blogCategories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortStrategy, setSortStrategy] = useState('descTime');
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
    const userId = useAppSelector((s) => s.auth?.user?.id);

    useEffect(() => {
        dispatch(fetchBlogs());
        dispatch(fetchBlogCategories());
    }, [dispatch]);

    const openModal = (id: number) => {
        setBlogToDelete(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setBlogToDelete(null);
    };

    const navigate = useNavigate();

    const handleDelete = async () => {
        if (blogToDelete !== null) {
            try {
                await dispatch(deleteBlog(blogToDelete));
                closeModal();
                dispatch(fetchBlogs());
                navigate("/community/blog_ui");
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    const handleFilterChange = () => {
        dispatch(filterBlog({
            sortStrategy,
            keyword: searchKeyword,
            categoryIdArray: selectedCategoryIds ?? []
        }));
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mt-10 mb-8">
                Blog Classic
            </h1>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/4">
                    <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
                        <Link to="/community/blog_ui/create">
                            <button type="button" className="mb-4 bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded">
                                Add your new post
                            </button>
                        </Link>
                        <div>
                            <h2 className="text-lg font-bold mb-2">Search</h2>
                            <input
                                type="text"
                                placeholder="Name, content or author"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <h2 className="text-lg font-bold mb-2">Sort By</h2>
                            <select
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={sortStrategy}
                                onChange={(e) => setSortStrategy(e.target.value)}
                            >
                                <option value="descTime">Latest</option>
                                <option value="ascTime">Oldest</option>
                                <option value="mostLike">Most like</option>
                                <option value="mostComment">Most comment</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-lg font-bold mb-2">Category</h2>
                            {blogCategories?.map((category: BlogCategory) => (
                                <div key={category.id} className="flex items-center mb-2">
                                    <input
                                        type="checkbox" // Step 3: Change to checkbox
                                        name="category"
                                        value={category.id}
                                        checked={selectedCategoryIds.includes(category.id)} // Step 5: Check if ID is in the array
                                        onChange={(e) => {
                                            const categoryId = Number(e.target.value);
                                            if (e.target.checked) {
                                                setSelectedCategoryIds(prevIds => [...prevIds, categoryId]);
                                            } else {
                                                setSelectedCategoryIds(prevIds => prevIds.filter(id => id !== categoryId));
                                            }
                                        }}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`category-${category.id}`} className="text-lg">{category.categoryName}</label>
                                </div>
                            ))}
                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleFilterChange}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Blog List Section */}
                <div className="w-full md:w-3/4">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {blogs?.data?.map((blog: Blog) => (
                            <li key={blog.id} className="bg-white p-6 rounded-lg shadow-md relative">
                                <div className="absolute top-0 right-0 flex space-x-2">
                                    <button
                                        className="bg-red-500 text-black hover:text-red-800 w-8 h-8 flex items-center justify-center"
                                        onClick={() => openModal(blog.id)}
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                    <Link to={`/community/blog_ui/edit/${blog.id}`}>
                                        <button
                                            className="bg-blue-500 text-black hover:text-blue-800 w-8 h-8 flex items-center justify-center"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                    </Link>
                                </div>
                                <div className="flex justify-between items-center mb-4 mt-4">
                                    <div className="flex items-center">
                                        <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${blog.photo}`} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                                        <p className="text-xl font-semibold">{blog.user.firstName} {blog.user.lastName}</p>
                                        <p className='ml-2'>at {new Date(blog.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <p className="text-m">Category: {blog.blogCategory.categoryName}</p>
                                </div>
                                <Link to={`/community/blog_ui/${blog.id}`}>
                                    <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${blog.photo}`} alt={blog.title} className="w-full h-75 object-cover mb-4" />
                                </Link>
                                <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center w-full mr-2">
                                        <VoteButton blogId={blog.id} userId={userId} initialLikes={blog.voteUp}/>
                                    </div>
                                    <div className="flex items-center w-full ml-2">
                                        <Link to={`/community/blog_ui/${blog.id}`} className="flex w-full">
                                            <button
                                                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center w-full justify-center"
                                            >
                                                <ChatIcon className="h-5 w-5 mr-3" /> <p>0</p>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-4">Are you sure you want to delete this post?</p>
                        <div className="flex justify-center">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogUIList;
