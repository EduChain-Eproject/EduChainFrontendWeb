import React, { useEffect, useState } from 'react';
import { RouteObject } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../common/context/store';
import { getUserAction } from '../../../auth/presentation/redux/AuthAction';
import { UserHomeworkRequest } from '../../domain/usecase/UserHomeworkUsecase';
import { fetchUserHomework } from '../redux/UserHomeworkAction';
import { setPage } from '../redux/UserHomeworkForProfileSlice';
import Pagination from '../../../../common/components/Pagination/Pagination';
import UserHomeworkComp from '../component/UserHomeworkComp';

export const route: () => RouteObject = () => {
    return {
        path: 'user-homework',
        element: <UserHomeworkPage />,
    };
};

const UserHomeworkPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector((state) => state.userhomeworkForPrile.userHomeworks);
    const { totalPages, currentPage } = useAppSelector((state) => state.userhomeworkForPrile.pagination);
    const id = useAppSelector((state) => state.auth.user?.id);

    const [isSubmitted, setIsSubmitted] = useState<boolean | null>(null);
    const [size, setSize] = useState(3);

    useEffect(() => {
        if (id) {
            dispatch(getUserAction());
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (id) {
            const request: UserHomeworkRequest = {
                userId: id,
                isSubmitted,
                page: currentPage,
                size,
            };
            dispatch(fetchUserHomework(request));
        }
    }, [dispatch, id, isSubmitted, currentPage, size]);

    const handlePageChange = (pageNumber: number) => {
        dispatch(setPage(pageNumber));
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setIsSubmitted(value === '' ? null : value === 'submitted');
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>User Homework</h1>
            <label>
                Status Filter:
                <select onChange={handleStatusChange} value={isSubmitted === null ? '' : isSubmitted ? 'submitted' : 'notSubmitted'}>
                    <option value="">All Statuses</option>
                    <option value="submitted">Submitted</option>
                    <option value="notSubmitted">Not Submitted</option>
                </select>
            </label>
            {data && <UserHomeworkComp data={data} onView={(id) => console.log('View:', id)} />}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                titleSearch={''}
                setSearch={() => {}}
            />
        </div>
    );
};

export default UserHomeworkPage;
