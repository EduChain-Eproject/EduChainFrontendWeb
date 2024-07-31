import React, { useEffect, useState } from 'react';
import { RouteObject } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/context/store';
import { DeleteUserInterestRes } from '../../domain/usecase/DeleteUserInterestUseCase';
import GetUserInterestComp from '../component/GetUserInterestComp';
import {
  fetchDeleteUserInterest,
  fetchUserInterests,
} from '../redux/UserInterestAction';
import { setPage } from '../redux/UserInterestSlice';
import { useSelector } from 'react-redux';
import { getUserAction } from '../../../auth/presentation/redux/AuthAction';
import Pagination from '../../../../common/components/Pagination/Pagination';

import SearchComponent from '../../../../common/components/Pagination/Search';
import { GetUserInterestReq } from '../../domain/usecase/GetUserInterests UserCase';

export const route: () => RouteObject = () => {
  return {
    path: 'interests',
    element: <UserInterestsPage />,
  };
};

const UserInterestsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.userInterest.userInterests);
  const { totalPages, currentPage } = useAppSelector((state) => state.userInterest.pagination);
  const id = useAppSelector((s) => s.auth.user?.id);

  const [titleSearch, setSearch] = useState('');
  const [size, setSize] = useState(3);
  const deleteStatus = useAppSelector((state) => state.userInterest.deleteStatus);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserAction());
    }
  }, [dispatch, id]);

  useEffect(() => {
    const request: GetUserInterestReq = {
      student_id: id!,
      titleSearch,
      page: currentPage,
      size,
    };
    dispatch(fetchUserInterests(request));
  }, [dispatch, titleSearch, currentPage, size, id]);

  const handleDelete = async (courseId: number, studentId: number) => {
    await dispatch(fetchDeleteUserInterest({ course_id: courseId, student_id: studentId }));
  
    const request: GetUserInterestReq = {
      student_id: id!,
      titleSearch,
      page: currentPage,
      size,
    };
    dispatch(fetchUserInterests(request));
  };

  const handleSearch = (query: string) => {
    setSearch(query); 
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <span className="block sm:inline">{error}</span>
  </div>
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">User Interests</h1>

      <SearchComponent onSearch={handleSearch} placeholder="Search by title..." value={titleSearch} />

      {deleteStatus.status === 'loading' && <div>Deleting...</div>}
      {deleteStatus.status === 'failed' && <div>Error deleting interest: {deleteStatus.error}</div>}
      {data && <GetUserInterestComp data={data} onDelete={handleDelete} />}
      <Pagination 
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserInterestsPage;
