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

  const handleFormSubmit = (data: UpdateCourseReq) => {
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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      {error && (
        <div className="text-red-600 mb-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="title"
            className="block font-semibold text-gray-800 text-lg"
          >
            Title
          </label>
          <input
            id="title"
            {...register('title')}
            className="mt-1 p-3 border border-gray-300 rounded-md block w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
          />
          {errors?.title && (
            <p className="text-red-600 text-sm mt-1">{errors?.title}</p>
          )}
        </div>
        
        <div>
          <label
            htmlFor="price"
            className="block font-semibold text-gray-800 text-lg"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            {...register('price')}
            className="mt-1 p-3 border border-gray-300 rounded-md block w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
          />
          {errors?.price && (
            <p className="text-red-600 text-sm mt-1">{errors?.price}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block font-semibold text-gray-800 text-lg"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="mt-1 p-3 border border-gray-300 rounded-md block w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
        />
        {errors?.description && (
          <p className="text-red-600 text-sm mt-1">{errors?.description}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="avatarCourse"
          className="block font-semibold text-gray-800 text-lg"
        >
          Image
        </label>
        {courseData?.avatarPath && (
          <div className="mb-4">
            <img
              src={courseData.avatarPath}
              alt="Current course image"
              className="h-32 w-32 object-cover rounded-md shadow-md"
            />
          </div>
        )}
        <input
          id="avatarCourse"
          type="file"
          {...register('avatarCourse')}
          className="mt-1 p-3 border border-gray-300 rounded-md block w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
        />
        {errors?.avatarCourse && (
          <p className="text-red-600 text-sm mt-1">{errors?.avatarCourse}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold text-gray-800 text-lg">
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
                    className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-300"
                  />
                )}
              />
              <label className="ml-3 block text-sm font-medium text-gray-700">
                {cate.categoryName} - {cate.id}
              </label>
            </div>
          ))}
          {errors?.categoryIds && (
            <p className="text-red-600 text-sm mt-1">{errors?.categoryIds}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center rounded-md bg-blue-500 px-6 py-3 text-lg font-medium text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

export default CourseFormUpdate;
