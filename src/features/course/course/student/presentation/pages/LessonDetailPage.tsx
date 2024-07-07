import { RouteObject, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../../common/context/store";
import React, { useEffect } from "react";
import { fetchCourseDetail, fetchLessonDetail } from "../redux/courseActions";
import AppBreadcrumb from "../../../../../../common/components/Breadcrumbs/AppBreadcrumb";
import Curriculum from "../components/Curriculum";


export const route: () => RouteObject = () => {
    return {
        path: ":courseId/lessons/:lessonId",
        element: <LessonDetailPage />
    }
}

const LessonDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const { lessonId, courseId } = useParams<{ lessonId: string, courseId: string }>();
    const dispatch = useAppDispatch();
    const { data: lesson, status, error } = useAppSelector(state => state.courses.student.lessonDetailPage);
    const chapters = useAppSelector(state => state.courses.student.courseDetailPage.data?.chapters);


    useEffect(() => {
        dispatch(fetchLessonDetail(Number(lessonId)));
    }, [lessonId, dispatch]);

    useEffect(() => {
        dispatch(fetchCourseDetail(Number(courseId)));
    }, [lessonId, dispatch]);

    const breadCrumbItems = [

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
            <div className="flex flex-row justify-between">
                {chapters &&
                    <Curriculum chapters={chapters} onLessonClick={(id) => navigate(`/courses/${courseId}/lessons/${id}`)}
                    />}
                <div className="flex flex-1 bg-white shadow rounded-lg p-6">
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
        </div>
    );
};
