import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Category from '../../../../../../common/entities/Category';
import { useAppSelector } from '../../../../../../common/context/store';
import { clearErrorStatus } from '../../data/redux/courseSlice';
import { CreateCourseReq } from '../../data/services/handleCreateCourse';
import { useDispatch } from 'react-redux';

interface CourseFormProps {
  initialData?: CreateCourseReq;
  onSubmit: (data: FormData) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ initialData, onSubmit }) => {
  const dispatch = useDispatch();
  const categories: Category[] | undefined = useAppSelector(
    (state) => state.courses.teacher.createCoursePage.data,
  );
  const { error, errors } = useAppSelector(
    (state) => state.courses.teacher.createCoursePage,
  );
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const { register, handleSubmit, reset, control } = useForm<CreateCourseReq>({
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: CreateCourseReq) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    if (data.avatarCourse && data.avatarCourse.length > 0) {
      formData.append('avatarCourse', data.avatarCourse[0]);
    }
  
    const categoryIds = Object.keys(data.categoryIds)
      .filter((key) => data.categoryIds[key])
      .map((key) => parseInt(key, 10));

    categoryIds.forEach((id) => formData.append('categoryIds', id.toString()));

    onSubmit(formData);
  };

  return (
    <div>
      <h1 className="text-red-500 text-3xl font-bold text-center mb-6">CREATE NEW COURSE</h1>

    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
  {error && (
    <div className="text-red-500 mb-4">
      {error}
      <button
        type="button"
        className="ml-2 text-blue-500 hover:underline"
        onClick={() => dispatch(clearErrorStatus('createCoursePage'))}
      >
        Clear error
      </button>
    </div>
  )}

  <div>
    <label
      htmlFor="title"
      className="block font-semibold text-lg text-gray-700"
    >
      Title
    </label>
    <input
      id="title"
      {...register('title')}
      className="mt-2 p-3 block w-full rounded-lg border-gray-500 shadow-sm focus:border-teal-500 focus:ring-teal-500"
    />
    {errors?.title && (
      <p className="text-red-500 text-sm mt-2">{errors?.title}</p>
    )}
  </div>
  <div>
    <label
      htmlFor="description"
      className="block font-semibold text-lg text-gray-700"
    >
      Description
    </label>
    <textarea
      id="description"
      {...register('description')}
      className="mt-2 p-3 block w-full rounded-lg border-gray-500 shadow-sm focus:border-teal-500 focus:ring-teal-500"
    />
    {errors?.description && (
      <p className="text-red-500 text-sm mt-2">{errors?.description}</p>
    )}
  </div>
  <div>
    <label
      htmlFor="price"
      className="block font-semibold text-lg text-gray-700"
    >
      Price
    </label>
    <input
      id="price"
      type="number"
      {...register('price')}
      className="mt-2 p-3 block w-full rounded-lg border-gray-500 shadow-sm focus:border-teal-500 focus:ring-teal-500"
    />
    {errors?.price && (
      <p className="text-red-500 text-sm mt-2">{errors?.price}</p>
    )}
  </div>
  <div>
    <label
      htmlFor="avatarCourse"
      className="block font-semibold text-lg text-gray-700"
    >
      Image
    </label>
    <input
      id="avatarCourse"
      type="file"
      {...register('avatarCourse')}
      className="mt-2 p-3 block w-full rounded-lg border-gray-500 shadow-sm focus:border-teal-500 focus:ring-teal-500"
    />
    {errors?.avatarCourse && (
      <p className="text-red-500 text-sm mt-2">{errors?.avatarCourse}</p>
    )}
  </div>
  <div className="relative inline-block text-left w-full">
    
    <button
      onClick={toggleDropdown}
      type="button"
      className="inline-flex justify-center w-full rounded-md border border-gray-500 shadow-sm px-4 py-2 bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      id="options-menu"
      aria-expanded="true"
      aria-haspopup="true"
    >
      Select Categories
      <svg
        className="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.293-3.294a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>

    {isOpen && (
      <div
        className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 w-full"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1" role="none">
          <div className="grid grid-cols-5 gap-4 px-4 py-2">
            {categories?.map((cate) => (
              <div
                key={cate.id}
                className="flex items-center p-2 rounded-md hover:bg-teal-100 transition-all"
              >
                <Controller
                  name={`categoryIds.${cate.id}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      {...field}
                      className="h-4 w-4 rounded border-gray-500 text-teal-600 focus:ring-teal-500"
                    />
                  )}
                />
                <label className="ml-2 block text-sm font-medium text-gray-700">
                  {cate.categoryName}
                </label>
              </div>
            ))}
          </div>
        </div>
        {errors?.categoryIds && (
          <p className="text-red-500 text-sm mt-2 px-4">
            {errors?.categoryIds}
          </p>
        )}
      </div>
    )}
  </div>

  <div className="flex justify-center">
    <button
      type="submit"
      className="justify-center items-center rounded-lg border border-transparent bg-teal-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
    >
      Submit
    </button>
  </div>
</form>
</div>

  );
};

export default CourseForm;
