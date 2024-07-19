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
import { GetUserInterestReq } from '../../domain/usecase/GetUserInterests UserCase';
import { useSelector } from 'react-redux';
import { getUserAction } from '../../../auth/presentation/redux/AuthAction';
import Pagination from '../../../../common/components/Pagination/Pagination';

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
  // const [page, setPage] = useState(0);
  const [size, setSize] = useState(3 );
  const  deleteStatus  = useAppSelector((state) => state.userInterest.deleteStatus);
  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };
  useEffect(() => {
    if(id){
      console.log('run');
      dispatch(getUserAction());
      console.log(id);
    }
  },[dispatch,id]);

  useEffect(() => {
    const request: GetUserInterestReq = {
        student_id:id!, 
        titleSearch,
        page:currentPage,
        size,
    };
    console.log(id);
    dispatch(fetchUserInterests(request));
 
}, [dispatch, titleSearch, currentPage, size, ]);

const handleDelete = async (courseId: number, studentId: number) => {
  console.log(`Deleting course ${courseId} for student ${studentId}`);
  await dispatch(fetchDeleteUserInterest({ course_id: courseId, student_id: studentId }));
  // Fetch updated user interests after deletion
  const request: GetUserInterestReq = {
    student_id: id!,
    titleSearch,
    page: currentPage,
    size,
  };
  dispatch(fetchUserInterests(request));
};

  if (status === 'loading') {
    return <div>Loading...</div>;
}

if (status === 'failed') {
    return <div>Error: {error}</div>;
}


  return (
      <div>
          <h1>User Interests</h1>
          {deleteStatus.status === 'loading' && <div>Deleting...</div>}
        {deleteStatus.status === 'failed' && <div>Error deleting interest: {deleteStatus.error}</div>}
        {data &&  <GetUserInterestComp data={data} onDelete={handleDelete} />}
          <Pagination 
       totalPages={totalPages}
       currentPage={currentPage}
       onPageChange={handlePageChange}
       titleSearch={titleSearch}
       setSearch={setSearch}/>
      </div>
  );
};

export default UserInterestsPage;