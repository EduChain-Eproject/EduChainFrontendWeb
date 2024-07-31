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
        return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    }
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold mb-6">User Homework</h1>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Status Filter:
              <select
                className="ml-2 p-2 border border-gray-300 rounded shadow-sm"
                onChange={handleStatusChange}
                value={isSubmitted === null ? '' : isSubmitted ? 'submitted' : 'notSubmitted'}
              >
                <option value="">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="notSubmitted">Not Submitted</option>
              </select>
            </label>
          </div>
          {data && (
            <div className="mb-4">
              <UserHomeworkComp data={data} onView={(id) => console.log('View:', id)} />
            </div>
          )}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      );
    };


export default UserHomeworkPage;
