import React, { useEffect } from 'react';
import CourseDetail from '../components/CourseDetail';
import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { deactivateCourse, fetchCourseDetail } from '../redux/courseActions';
import CourseInfo from '../components/CourseInfo'
import CategoryList from '../components/CategoryList'
import ChapterList from '../components/ChapterList'
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';

export const route: () => RouteObject = () => {

    return {
        path: "courses/:courseId",
        element: <CourseDetailPage />
    }
}

const CourseDetailPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const dispatch = useAppDispatch();
    const nagivate = useNavigate();
    const { data, status, error } = useAppSelector((state) => state.courses.teacher.courseDetailPage);

    const breadCrumbItems = [
        {
            label: "Home", href: "/dashboard/teacher",
        },
        {
            label: "Course by you", href: "/dashboard/teacher/courses",
        },
        {
            label: `Course ${data?.title}`, href: `/dashboard/teacher/courses/${courseId}`,
        },
    ]

    useEffect(() => {
        dispatch(fetchCourseDetail(Number(courseId)));
    }, [dispatch, courseId]);

    if (status === 'pending') {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
    }

    if (!data) {
        return <div className="text-center mt-4">No course detail found.</div>;
    }

    const handleDeactivate = () => {
        courseId && dispatch(deactivateCourse(Number(courseId)));
    };

    const handleCreateChapter = () => {
        nagivate(`/dashboard/teacher/chapters/course/${courseId}/create/`);
    };

    return (
        <div>
            <AppBreadcrumb items={breadCrumbItems} />

            <div className="max-w-5xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-4 flex flex-col lg:flex-row">

                <div className="w-full lg:w-2/3 p-4">
                    <CourseInfo course={data} />
                    <button
                        onClick={handleDeactivate}
                        className={`mt-4 ${data.status === "DEACTIVATED" ? "bg-green-500" : "bg-red-500"} text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500`}
                    >
                        {data.status === "DEACTIVATED" ? "Activate Course" : "Deactivate Course"}
                    </button>
                    <CategoryList categories={data.categories} />
                </div>
                <div className="w-full lg:w-1/3 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Chapters</h3>
                        <button
                            onClick={handleCreateChapter}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Create New Chapter
                        </button>
                    </div>
                    <ChapterList chapters={data.chapters} courseId={Number(courseId)} />
                </div>
            </div>
        </div>

    );
};


export default CourseDetailPage;
