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
    console.log(typeof data.avatarCourse[0])
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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
          className="block font-medium text-meta-4 text-2xl"
        >
          Title
        </label>
        <input
          id="title"
          {...register('title')}
          className="mt-1 p-4 dark:bg-slate-100 dark:text-meta-4 bg-slate-500 text-meta-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors?.title && (
          <p className="text-red-500 text-xs italic mt-1">{errors?.title}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="block font-medium text-meta-4 text-2xl"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="mt-1 p-4 dark:bg-slate-100 dark:text-meta-4 bg-slate-500 text-meta-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors?.description && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors?.description}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="price"
          className="block font-medium text-meta-4 text-2xl"
        >
          Price
        </label>
        <input
          id="price"
          type="number"
          {...register('price')}
          className="mt-1 p-4 dark:bg-slate-100 dark:text-meta-4 bg-slate-500 text-meta-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors?.price && (
          <p className="text-red-500 text-xs italic mt-1">{errors?.price}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="avatarCourse"
          className="block font-medium text-meta-4 text-2xl"
        >
          Image
        </label>
        <input
          id="avatarCourse"
          type="file"
          {...register('avatarCourse')}
          className="mt-1 p-4 dark:bg-slate-100 dark:text-meta-4 bg-slate-500 text-meta-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors?.avatarCourse && (
          <p className="text-red-500 text-xs italic mt-1">{errors?.avatarCourse}</p>
        )}
      </div>
      <div className="relative inline-block text-left w-full">
        
      <button
        onClick={toggleDropdown}
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
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
            {/* Chia thành grid với 5 cột */}
            <div className="grid grid-cols-5 gap-4 px-4 py-2">
              {categories?.map((cate) => (
                <div key={cate.id} className="flex items-center">
                  <Controller
                    name={`categoryIds.${cate.id}`}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        {...field}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
            <p className="text-red-500 text-xs italic mt-1 px-4">
              {errors?.categoryIds}
            </p>
          )}
        </div>
      )}
    </div>

      <br />
      <div className="flex justify-center">
  <button
    type="submit"
    className="justify-center items-center rounded-lg border border-transparent bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform w-80 hover:scale-105"
  >
    Submit
  </button>
</div>




    </form>
  );
};

export default CourseForm;
