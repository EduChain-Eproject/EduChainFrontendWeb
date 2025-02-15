import React, { useState, useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../common/context/store';
import { UpdateBlogReq } from '../../data/redux/action/updateBlog';
import { fetchBlog } from '../../data/redux/action/fetchBlog';
import Modal from './Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBlogCategories } from '../../data/redux/action/fetchCategories';
import { BlogCategory } from '../../data/model/BlogCategory';

interface UpdateBlogFormProps {
  onSubmit: (data: UpdateBlogReq) => Promise<void>;
}

const UpdateBlogForm: React.FC<UpdateBlogFormProps> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const blogDetail = useAppSelector((state) => state.blogUiSlice.blogDetail);
  const blogCategories = useAppSelector(
    (state) => state.blogUiSlice.blogCategories,
  );
  const updateBlog = useAppSelector((s) => s.blogUiSlice.blogUpdate);
  const { blogId } = useParams<{ blogId: string }>();
  const bId = Number(blogId) || 0;

  useEffect(() => {
    if (bId) {
      dispatch(fetchBlog(bId));
    }
  }, [bId, dispatch]);

  useEffect(() => {
    dispatch(fetchBlogCategories());
    console.log(blogCategories.data);
  }, [dispatch]);
  useEffect(() => {
    if (blogCategories.data) {
      console.log(blogCategories.data); // Kiểm tra dữ liệu đã thay đổi chưa
    }
  }, [blogCategories.data]);
  const [title, setTitle] = useState('');
  const [blogCategoryId, setBlogCategoryId] = useState(0);
  const [blogText, setBlogText] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (blogDetail.data) {
      setTitle(blogDetail.data.title);
      setBlogCategoryId(blogDetail.data.blogCategory.id);
      setBlogText(blogDetail.data.blogText);
    }
  }, [blogDetail]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const blogData: UpdateBlogReq = {
      id: bId,
      title,
      blogCategoryId,
      blogText,
      photo,
    };
    try {
        console.log(blogData)
      await onSubmit(blogData);
      // setModalMessage('Blog updated successfully!');
      // setModalType('success');
      // setShowModal(true);
    } catch (error) {
      setModalMessage('Failed to update blog. Please try again.');
      setModalType('error');
      setShowModal(true);
    }
  };


  return (
    <>
      {showModal && <Modal type={modalType} message={modalMessage} />}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-4 bg-white shadow-md rounded"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update Blog</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {updateBlog.errors?.title && (
            <p className="text-red-500 text-xs italic">
              {updateBlog.errors?.title}
            </p>
          )}
        </div>
        <div className="mb-4"> 
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="blogCategoryId"
          >
            Blog Category
          </label>
          <select
            id="blogCategoryId"
            value={blogCategoryId}
            onChange={(e) => setBlogCategoryId(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {blogCategories.data &&
              blogCategories.data.map((category: BlogCategory) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
          </select>
          {updateBlog.errors?.blogCategoryId && (
            <p className="text-red-500 text-xs italic">
              {updateBlog.errors.blogCategoryId}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="blogText"
          >
            Blog Text
          </label>
          <textarea
            id="blogText"
            value={blogText}
            onChange={(e) => setBlogText(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
          {updateBlog.errors?.blogText && (
            <p className="text-red-500 text-xs italic">
              {updateBlog.errors?.blogText}
            </p>
          )}
        </div>
        {/* {blogDetail.data?.photo && (
                    <div className="my-4">
                        <label className="block text-sm font-medium text-gray-700">Current Photo</label>
                        <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${blogDetail.data.photo}`}
                            alt="Blog"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                )} */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="photo"
          >
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
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateBlogForm;
