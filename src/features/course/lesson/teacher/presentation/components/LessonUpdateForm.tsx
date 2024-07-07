import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { updateLesson } from '../redux/lessonActions';
import { UpdateLessonReq } from '../../domain/usecases/UpdateLesson';
import { useNavigate } from 'react-router-dom';

interface LessonUpdateFormProps {
    lessonId: number;
}

const LessonUpdateForm: React.FC<LessonUpdateFormProps> = ({ lessonId }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { handleSubmit, control, setValue, formState: { errors } } = useForm<UpdateLessonReq>();
    const { data: lesson } = useAppSelector(state => state.lessons.teacher.lessonDetailPage);

    useEffect(() => {
        if (lesson) {
            setValue('lessonTitle', lesson.lessonTitle);
            setValue('description', lesson.description);
            setValue('videoTitle', lesson.videoTitle);
        }
    }, [lesson, setValue]);

    const onSubmit = (formData: UpdateLessonReq) => {
        dispatch(
            updateLesson({ lessonId, lessonData: formData })
        )
            .then(
                () => navigate(`/dashboard/teacher/lessons/${lessonId}`)
            );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Lesson Title</label>
                <Controller
                    name="lessonTitle"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.lessonTitle ? 'border-red-500' : ''}`}
                        />
                    )}
                />
                {errors.lessonTitle && <p className="text-red-500 text-sm mt-1">{errors.lessonTitle.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.description ? 'border-red-500' : ''}`}
                        />
                    )}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Video Title</label>
                <Controller
                    name="videoTitle"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.videoTitle ? 'border-red-500' : ''}`}
                        />
                    )}
                />
                {errors.videoTitle && <p className="text-red-500 text-sm mt-1">{errors.videoTitle.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Video File</label>
                <Controller
                    name="file"
                    control={control}
                    render={({ field }) => (
                        <input
                            // {...field}
                            type="file"
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.file ? 'border-red-500' : ''}`}
                            onChange={(e) => field.onChange(e.target.files)}
                        />
                    )}
                />
                {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>}
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
    );
};

export default LessonUpdateForm;
