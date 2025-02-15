import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import {
  createChapter,
  CreateChapterReq,
  resetcreateChapterStatus,
} from '../../data/services/handleCreateChapter';

interface ChapterFormProps {
  courseId: number;
}

const ChapterForm: React.FC<ChapterFormProps> = ({ courseId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {data,error,errors,status} = useAppSelector((s) => s.chapters.teacher.createChapterPage)
  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<CreateChapterReq>({
    defaultValues: {
      chapterTitle: '',
    },
  });

  const onSubmit = (formData: CreateChapterReq) => {
    dispatch(
      createChapter({
        ...formData,
        courseId,
      }),
    )
  };


   useEffect(() => {
    if(status === 'succeeded'){
      console.log(status)
      dispatch(resetcreateChapterStatus());
      navigate(`/dashboard/teacher/courses/${courseId}`) ;
    }
  }, [ status, navigate,dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Chapter Title
        </label>
        <Controller
          name="chapterTitle"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50
              `}
            />
          )}
        />
            {errors?.chapterTitle && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.chapterTitle}</p>
            )}
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
          onClick={() => navigate(`/dashboard/teacher/courses/${courseId}`)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ChapterForm;
