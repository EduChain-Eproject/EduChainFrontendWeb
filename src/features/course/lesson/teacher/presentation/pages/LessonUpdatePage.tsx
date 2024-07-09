import { RouteObject, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../../common/context/store";
import { useEffect } from "react";
import React from "react";
import AppBreadcrumb from "../../../../../../common/components/Breadcrumbs/AppBreadcrumb";
import { fetchLessonDetail, updateLesson } from "../redux/lessonActions";
import { useForm, Controller } from 'react-hook-form';
import Lesson from "../../domain/entities/Lesson";
import { UpdateLessonReq } from "../../domain/usecases/UpdateLesson";
import LessonUpdateForm from "../components/LessonUpdateForm";

export const route: () => RouteObject = () => {
    return {
        path: "lessons/update/:lessonId",
        element: <LessonUpdatePage />
    }
}

const LessonUpdatePage: React.FC = () => {
    const { lessonId } = useParams<{ lessonId: string }>();
    const dispatch = useAppDispatch();
    const { status, error, data: lesson } = useAppSelector(state => state.lessons.teacher.lessonDetailPage);

    useEffect(() => {
        dispatch(fetchLessonDetail(Number(lessonId)));
    }, [lessonId, dispatch]);

    const breadCrumbItems = [
        { label: "Home", href: "/dashboard/teacher" },
        { label: "Course by you", href: "/dashboard/teacher/courses" },
        { label: `Course ${lesson?.chapter?.course?.title}`, href: `/dashboard/teacher/courses/${lesson?.chapter?.course.id}` },
        { label: `Chapter ${lesson?.chapter?.chapterTitle}`, href: `/dashboard/teacher/chapters/${lesson?.chapter.id}` },
        { label: `Lesson ${lesson?.lessonTitle}`, href: `/dashboard/teacher/lessons/${lessonId}` },
        { label: `Update Lesson ${lesson?.lessonTitle}`, href: `/dashboard/teacher/lessons/update/${lessonId}` },
    ];

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <AppBreadcrumb items={breadCrumbItems} />
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Update Lesson</h1>
                <LessonUpdateForm lessonId={Number(lessonId)} />
                {status === 'loading' && <p>Updating...</p>}
                {status === 'failed' && <p>Error: {error}</p>}
                {status === 'succeeded' && <p>Lesson updated successfully!</p>}
            </div>
        </div>
    );
};

