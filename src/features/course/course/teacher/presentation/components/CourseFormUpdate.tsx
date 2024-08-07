import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { clearErrorStatus } from '../../data/redux/courseSlice';
import { resetCourseUpdate, UpdateCourseReq } from '../../data/services/handleUpdateCourse';

interface CourseFormUpdateProps {
  onSubmit: (data: FormData) => void;
}

const CourseFormUpdate: React.FC<CourseFormUpdateProps> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const { data: courseData } = useAppSelector(
    (state) => state.courses.teacher.courseDetailPage,
  );
  const { data: listCategories } = useAppSelector(
    (state) => state.courses.teacher.createCoursePage,
  );

  const { register, handleSubmit, reset, control, setValue } = useForm<UpdateCourseReq>({
    defaultValues: courseData || {},
  });

  const { status, error, errors } = useAppSelector(
    (state) => state.courses.teacher.updateCoursePage,
  );

  useEffect(() => {
    if (courseData) {
      reset(courseData);
    }
  }, [courseData, reset]);

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(resetCourseUpdate());
    }
  }, [status, dispatch]);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setValue('avatarCourse', file);
  //   }
  // };

  const handleFormSubmit = (data: UpdateCourseReq) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    if (data.avatarCourse) {
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
            onClick={() => dispatch(clearErrorStatus('updateCoursePage'))}
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
      <div>
        <label className="block font-medium text-meta-4 text-2xl">
          Categories
        </label>
        <div className="mt-2 space-y-2">
          {listCategories?.map((cate) => (
            <div key={cate.categoryName} className="flex items-center">
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
              <label className="ml-3 block text-sm font-medium text-gray-700">
                {cate.categoryName} - {cate.id}
              </label>
            </div>
          ))}
          {errors?.categoryIds && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors?.categoryIds}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

export default CourseFormUpdate;
