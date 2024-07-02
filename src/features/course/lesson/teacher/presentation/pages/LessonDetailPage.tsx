import { RouteObject, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../../common/context/store";
import { useEffect } from "react";
import React from "react";
import AppBreadcrumb from "../../../../../../common/components/Breadcrumbs/AppBreadcrumb";
import { fetchLessonDetail } from "../redux/lessonActions";

export const route: () => RouteObject = () => {
    return {
        path: "lessons/:lessonId",
        element: <LessonDetailPage />
    }
}

const LessonDetailPage: React.FC = () => {
    const { lessonId } = useParams<{ lessonId: string }>();
    const dispatch = useAppDispatch();
    const { status, error, data: lesson } = useAppSelector(state => state.lessons.teacher.lessonDetailPage);

    useEffect(() => {
        dispatch(fetchLessonDetail(Number(lessonId)));
    }, [lessonId, dispatch]);

    const breadCrumbItems = [
        { label: "Home", href: "/dashboard/teacher", },
        { label: "Course by you", href: "/dashboard/teacher/courses", },
        { label: `Course ${lesson?.chapter?.course?.title}`, href: `/dashboard/teacher/courses/${lesson?.chapter?.course.id}`, },
        { label: `Chapter ${lesson?.chapter?.chapterTitle}`, href: `/dashboard/teacher/chapters/${lesson?.chapter.id}` },
        { label: `Lesson ${lesson?.lessonTitle}`, href: `/dashboard/teacher/lessons/${lessonId}` },
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
                <h1 className="text-2xl font-bold mb-4">Lesson Detail</h1>
                <div>
                    <h2 className="text-xl font-semibold">{lesson?.lessonTitle}</h2>
                    <p>{lesson?.description}</p>
                    <h3 className="text-lg font-medium">Video</h3>
                    <p>{lesson?.videoTitle}</p>
                    <a href={lesson?.videoURL} target="_blank" rel="noopener noreferrer">
                        {lesson?.videoURL}
                    </a>
                    {/* Render other properties */}
                </div>
            </div>
        </div>
    );
};
