import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { clearErrorStatus } from '../redux/courseSlice';
import { UpdateCourseReq } from '../../domain/usecases/UpdateCourse';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import Course from '../../domain/entities/Course';

interface CourseFormUpdateProps {
    onSubmit: (data: UpdateCourseReq) => void;
}

const CourseFormUpdate: React.FC<CourseFormUpdateProps> = ({ onSubmit }) => {
    const dispatch = useAppDispatch();
    const { data: courseData } = useAppSelector((state) => state.courses.teacher.courseDetailPage);
    const { data: listCategories } = useAppSelector((state) => state.courses.teacher.createCoursePage);

    const { register, handleSubmit, reset, control } = useForm<UpdateCourseReq>({
        defaultValues: courseData || {},
    });

    const { status, error } = useAppSelector(state => state.courses.teacher.updateCoursePage);

    useEffect(() => {
        if (courseData) {
            reset(courseData);
        }
    }, [courseData, reset]);

    useEffect(() => {
        if (status === 'update course succeeded') {
            // Handle successful update
        }
    }, [status]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
                <div className="text-red-500 mb-4">
                    {error}
                    <button
                        type="button"
                        className="ml-2 text-blue-500 hover:underline"
                        onClick={() => dispatch(clearErrorStatus("updateCoursePage"))}
                    >
                        Clear error
                    </button>
                </div>
            )}

            <div>
                <label htmlFor="title" className="block font-medium text-meta-4 text-2xl">
                    Title
                </label>
                <input
                    id="title"
                    {...register('title', { required: true })}
                    className="mt-1 p-4 dark:bg-slate-100 dark:text-meta-4 bg-slate-500 text-meta-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="description" className="block font-medium text-meta-4 text-2xl">
                    Description
                </label>
                <textarea
                    id="description"
                    {...register('description', { required: true })}
                    className="mt-1 p-4 dark:bg-slate-100 dark:text-meta-4 bg-slate-500 text-meta-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="price" className="block font-medium text-meta-4 text-2xl">
                    Price
                </label>
                <input
                    id="price"
                    type="number"
                    {...register('price', { required: true })}
                    className="mt-1 p-4 dark:bg-slate-100 dark:text-meta-4 bg-slate-500 text-meta-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block font-medium text-meta-4 text-2xl">Categories</label>
                <div className="mt-2 space-y-2">
                    {listCategories?.map((cate) => (
                        <div key={cate.id} className="flex items-center">
                            <Controller
                                name={`categoryIds.${cate.id}`}
                                control={control}
                                defaultValue={listCategories && listCategories[0].id}
                                render={({ field }) => (
                                    <input
                                        type="checkbox"
                                        defaultChecked={courseData?.categories?.some(c => c.id == cate.id || false)}
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
