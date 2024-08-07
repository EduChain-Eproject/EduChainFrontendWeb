import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { useNavigate } from 'react-router-dom';
import {
  updateLesson,
  UpdateLessonReq,
} from '../../data/services/handleUpdateLesson';

interface LessonUpdateFormProps {
  lessonId: number;
}

const LessonUpdateForm: React.FC<LessonUpdateFormProps> = ({ lessonId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    // formState: { errors },
  } = useForm<UpdateLessonReq>();
  const { data: lesson } = useAppSelector(
    (state) => state.lessons.teacher.lessonDetailPage,
  );

  const {status,error,errors} = useAppSelector((state) => state.lessons.teacher.updateLessonPage);

  useEffect(() => {
    if (lesson) {
      setValue('lessonTitle', lesson.lessonTitle);
      setValue('description', lesson.description);
      setValue('videoTitle', lesson.videoTitle);
      setValue('videoFile',lesson.videoFile)
    }
  }, [lesson, setValue]);

  const onSubmit = (formData: UpdateLessonReq) => {
    dispatch(updateLesson({ lessonId, lessonData: formData })).then(() =>
      navigate(`/dashboard/teacher/lessons/${lessonId}`),
    );
  };
  useEffect(() => {
    if(status === 'succeeded'){
      navigate(`/dashboard/teacher/lessons/${lessonId}`)
    }
  })
  return (
    <div>
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
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 `}
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
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 `}
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
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
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
          name="videoFile"
          control={control}
          render={({ field }) => (
            <input
              // {...field}
              type="file"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 `}
              onChange={(e) => field.onChange(e.target.files)}
            />
          )}
        />
            {errors?.videoFile && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.videoTitle}</p>
            )}
      </div>
      <div className="space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => navigate(`/dashboard/teacher/lessons/${lessonId}`)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
    <video controls className="mt-4 w-full">
  <source
    src={`http://localhost:8080/uploadsVideo/${lesson?.videoURL}`}
    type="video/mp4" // or the appropriate type for your video file
  />
  Your browser does not support the video tag.
</video>
    </div>
  
  );
};

export default LessonUpdateForm;
