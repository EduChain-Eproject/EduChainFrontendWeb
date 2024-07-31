import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import {
  createLesson,
  CreateLessonReq,
} from '../../data/services/handleCreateLesson';

const LessonCreateForm: React.FC<{ chapterId: number }> = ({ chapterId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<CreateLessonReq>();

  const onSubmit = (formData: CreateLessonReq) => {
    dispatch(
      createLesson({
        lessonData: { ...formData, chapterId: chapterId.toString() },
      }),
    ).then(() => navigate(`/dashboard/teacher/chapters/${chapterId}`));
  };
  const { error, errors } = useAppSelector(
    (state) => state.lessons.teacher.createLessonPage,
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Lesson Title
        </label>
        <Controller
          name="lessonTitle"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50
              }`}
            />
          )}
        />
            {errors?.lessonTitle && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.lessonTitle}</p>
            )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 
              }`}
            />
          )}
        />
          {errors?.description && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.description}</p>
            )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Video Title
        </label>
        <Controller
          name="videoTitle"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 `}
            />
          )}
        />
           {errors?.videoTitle && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.videoTitle}</p>
            )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Video File
        </label>
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 `}
              onChange={(e) => field.onChange(e.target.files)}
            />
          )}
        />
      </div>
      <div className="space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => navigate(`/dashboard/teacher/chapters/${chapterId}`)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default LessonCreateForm;
