import { RouteObject, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../../common/context/store";
import { useEffect } from "react";
import { deleteChapter, getChapterDetail } from "../redux/courseActions";
import React from "react";
import LessonList from '../components/LessonList'
import AppBreadcrumb from "../../../../../../common/components/Breadcrumbs/AppBreadcrumb";

export const route: () => RouteObject = () => {
    return {
        path: "chapters/:chapterId",
        element: <ChapterDetailPage />
    }
}

const ChapterDetailPage: React.FC = () => {
    const { data, status, error } = useAppSelector(state => state.chapters.teacher.chapterDetailPage);
    const dispatch = useAppDispatch();
    const { chapterId } = useParams<{ chapterId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (chapterId) {
            dispatch(getChapterDetail(Number(chapterId)));
        }
    }, [chapterId, dispatch]);

    const handleLessonClick = (lessonId: number) => {
        navigate(`/dashboard/teacher/lessons/${lessonId}`);
    };

    const handleUpdateLesson = (lessonId: number) => {
        navigate(`/dashboard/teacher/lessons/update/${lessonId}`);
    };

    const handleDeleteLesson = (lessonId: number) => {
        // Implement delete lesson logic
    };

    const handleUpdateChapter = () => {
        navigate(`/dashboard/teacher/chapters/update/${chapterId}`);
    };

    const handleDeleteChapter = () => {
        dispatch(deleteChapter(
            Number(chapterId),
        )).then(() => {
            navigate(`/dashboard/teacher/courses/${data?.course.id}`);
        });
    };

    const breadCrumbItems = [
        {
            label: "Home", href: "/dashboard/teacher",
        },
        {
            label: "Course by you", href: "/dashboard/teacher/courses",
        },
        {
            label: `Course ${data?.course?.title}`, href: `/dashboard/teacher/courses/${data?.course.id}`,
        },
        { label: `Chapter ${data?.chapterTitle}`, href: `/dashboard/teacher/chapters/${chapterId}` }
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
            {data && (
                <div className="bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">{data.chapterTitle}</h1>
                    <div className="mb-4 space-x-2">
                        <button
                            onClick={handleUpdateChapter}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Update Chapter
                        </button>
                        <button
                            onClick={handleDeleteChapter}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Delete Chapter
                        </button>
                    </div>
                    <LessonList
                        lessons={data.lessons || []}
                        onLessonClick={handleLessonClick}
                        onUpdateLesson={handleUpdateLesson}
                        onDeleteLesson={handleDeleteLesson}
                    />
                </div>
            )}
        </div>
    );
};
