import React, { useEffect, useState } from 'react';
import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { searchCourses } from '../redux/courseActions';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import { CourseSearchParams } from '../../domain/usecases/SearchCourses';
import FilterBar from '../components/FilterBar';
import CourseList from '../components/CourseList';

export const route: () => RouteObject = () => {
    return {
        path: "",
        element: <CoursesListPage />
    }
}



const CoursesListPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { data, status, error } = useAppSelector((state) => state.courses.student.listCoursesPage);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [sortBy, setSortBy] = useState('title');
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

    useEffect(() => {
        const request: CourseSearchParams = {
            categoryIds: selectedCategoryIds,
            search,
            page,
            size,
            sortBy
        };

        dispatch(searchCourses(request));
    }, [dispatch, search, page, size, sortBy, selectedCategoryIds]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const breadCrumbItems = [
        { label: "Home", href: "" },
        { label: "Courses", href: "/courses" },
    ];

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="mx-auto max-w-4xl px-4">
            <AppBreadcrumb items={breadCrumbItems} />
            <FilterBar
                search={search}
                setSearch={setSearch}
                setPage={setPage}
                size={size}
                setSize={setSize}
                sortBy={sortBy}
                setSortBy={setSortBy}
                categories={data?.categories}
                selectedCategoryIds={selectedCategoryIds}
                setSelectedCategoryIds={setSelectedCategoryIds}
            />
            <CourseList
                courses={data?.courses?.content || []}
                totalPages={data?.courses?.totalPages || 0}
                currentPage={page}
                onViewCourseDetail={(courseId) => {
                    navigate(`/courses/${courseId}`)
                }}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default CoursesListPage;