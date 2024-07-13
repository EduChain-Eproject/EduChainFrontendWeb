import React, { useEffect } from 'react';
import CourseDetail from '../components/CourseDetail';
import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { changeStatusOfCourse, fetchCourseDetail } from '../redux/courseActions';
import CourseInfo from '../components/CourseInfo'
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import { CourseStatusForCensor } from '../../domain/usecases/GetCoursesByStatus';
import { ChangeCourseStatusRequest } from '../../domain/usecases/DeactivateCourse';

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
    const { data, status, error } = useAppSelector((state) => state.courses.censor.courseDetailPage);

    const breadCrumbItems = [
        {
            label: "Home", href: "/dashboard/censor",
        },
        {
            label: "List of Courses", href: "/dashboard/censor/courses",
        },
        {
            label: `Course ${data?.title}`, href: `/dashboard/censor/courses/${courseId}`,
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

    const handleApproveOrDelete = (req: ChangeCourseStatusRequest) => {
        courseId && dispatch(changeStatusOfCourse(req));
    };

    return (
        <div>
            <AppBreadcrumb items={breadCrumbItems} />

            <div className="max-w-5xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-4 flex flex-col lg:flex-row">

                <div className="w-full lg:w-2/3 p-4">
                    <CourseInfo course={data} />
                    {data.status == CourseStatusForCensor.UNDER_REVIEW && (
                        <div>

                            <button
                                onClick={() => {
                                    handleApproveOrDelete({
                                        courseId: Number(courseId),
                                        status: CourseStatusForCensor.APPROVED
                                    })
                                }
                                }
                                className={`mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-red-500`}
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => {
                                    handleApproveOrDelete({
                                        courseId: Number(courseId),
                                        status: CourseStatusForCensor.DELETED
                                    })
                                }
                                }
                                className={`mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500`}
                            >
                                Delete
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};


export default CourseDetailPage;
