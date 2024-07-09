import React, { useEffect, useState } from 'react';
import CourseList from '../components/CourseList';
import { RouteObject, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { fetchCoursesByStatus } from '../redux/courseActions';
import { GetCoursesByStatusRequest, CourseStatusForCensor } from '../../domain/usecases/GetCoursesByStatus';
import FilterBar from '../components/FilterBar';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';

export const route: () => RouteObject = () => {
    return {
        path: "courses",
        element: <CoursesPage />
    }
}

const breadCrumbItems = [
    {
        label: "Home", href: "/dashboard/censor",
    },
    {
        label: "List of Courses", href: "/dashboard/censor/courses",
    },
]

const CoursesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { data, status, error } = useAppSelector((state) => state.courses.censor.listCoursesPage);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [sortBy, setSortBy] = useState('title');
    const [selectedStatus, setSelectedStatus] = useState<CourseStatusForCensor>(CourseStatusForCensor.ALL); // Default to APPROVED

    useEffect(() => {
        const request: GetCoursesByStatusRequest = {
            censorId: 1,
            search,
            page,
            size,
            sortBy,
            status: selectedStatus
        };

        console.log("fetching...");

        dispatch(fetchCoursesByStatus(request));
    }, [dispatch, search, page, size, sortBy, selectedStatus]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const handleViewCourseDetail = (courseId: number) => {
        navigate(`/dashboard/censor/courses/${courseId}`)
    };

    return (
        <div className="mx-auto max-w-4xl px-4">
            <AppBreadcrumb items={breadCrumbItems} />
            <FilterBar
                search={search}
                setSearch={setSearch}
                page={page}
                setPage={setPage}
                size={size}
                setSize={setSize}
                sortBy={sortBy}
                setSortBy={setSortBy}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
            />
            {data && <CourseList
                onPageChange={setPage}
                courses={data?.content || []}
                totalPages={data?.totalPages || 0}
                currentPage={page}
                onViewCourseDetail={handleViewCourseDetail}
            />}
        </div>
    );
};


export default CoursesPage;
