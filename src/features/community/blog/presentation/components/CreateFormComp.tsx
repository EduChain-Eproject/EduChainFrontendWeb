import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { CreateBlogReq } from '../../domain/usecases/CreateBlog';
import { fetchBlogCategories } from '../../../../front-end/blogs/data/redux/action/fetchCategories';
import Modal from '../../../../front-end/blogs/presentation/components/Modal';
import { resetcreateBlogComment } from '../../../blogComment/presentation/redux/BlogCommentActions';


interface CreateBlogFormProps {
  onSubmit: (data: CreateBlogReq) => void;
}

export const CreateFormComp: React.FC<CreateBlogFormProps> = ({onSubmit}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: blogCategories,
    status,
    error,
    errors: errorsBlog,
  } = useAppSelector((state) => state.blogUiSlice.blogCategories);

  const [title, setTitle] = useState('');

  const [blogCategoryId, setBlogCategoryId] = useState(0);
  const [blogText, setBlogText] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const createBlogData = useAppSelector(
    (state) => state.blogs.createBlog,
  );
  const userId = useAppSelector(
    (state) => state.auth.user?.id,
  );
  useEffect(() => {
    dispatch(fetchBlogCategories());
  }, [dispatch]);



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const blogData: CreateBlogReq = {
      title,
      userId:userId!,
      blogCategoryId,
      blogText,
      photo,
    };
    try {
       onSubmit(blogData);
    } catch (error) {
      setModalMessage('Failed to create blog. Please try again.');
      setModalType('error');
      setShowModal(true);
    }
  };

  useEffect(() => {
    if(createBlogData.status === 'succeeded'){
        navigate('/dashboard/blog');      
    }
  },[navigate,createBlogData.status])


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };
  return (
    <>
    {showModal && <Modal type={modalType} message={modalMessage} />}
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 bg-white shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Blog</h2>
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
        {/* {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>} */}
        {createBlogData.errors?.title && (
          <p className="text-red-500 text-xs italic">
            {createBlogData.errors?.title}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="userId"
        >
          User ID
        </label>
        {/* {errors.userId && <p className="text-red-500 text-xs italic">{errors.userId}</p>} */}
        {createBlogData.errors?.userId && (
          <p className="text-red-500 text-xs italic">
            {createBlogData.errors?.userId}
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
          <option value={0}>Select a category</option>
          {status === 'loading' && <option value="">Loading...</option>}
          {status === 'succeeded' &&
            blogCategories!.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          {status === 'failed' && (
            <option value="">Failed to load categories</option>
          )}
        </select>
        {/* {errors.blogCategoryId && <p className="text-red-500 text-xs italic">{errors.blogCategoryId}</p>} */}
        {createBlogData.errors?.blogCategoryId && (
          <p className="text-red-500 text-xs italic">
            {createBlogData.errors?.blogCategoryId}
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
        {/* {errors.blogText && <p className="text-red-500 text-xs italic">{errors.blogText}</p>} */}
        {createBlogData.errors?.blogText && (
          <p className="text-red-500 text-xs italic">
            {createBlogData.errors?.blogText}
          </p>
        )}
      </div>
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
        {/* {errors.photo && <p className="text-red-500 text-xs italic">{errors.photo}</p>} */}
        {createBlogData.errors?.photo && (
          <p className="text-red-500 text-xs italic">
            {createBlogData.errors?.photo}
          </p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
      {createBlogData.error && (
        <p className="text-red-500 text-xs italic mt-1">
          {createBlogData.error}
        </p>
      )}
    </form>
  </>
  )
}
