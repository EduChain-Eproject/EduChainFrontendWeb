import React, { useEffect, useState } from "react";
import { RouteObject } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../common/context/store";
import { getUserAction } from "../../../auth/presentation/redux/AuthAction";
import { GetUserCourseRequest } from "../../domain/usecase/GetUserCourseUseCase";
import { fetchUserCourse } from "../redux/UserCourseAction";

import { setPage } from "../redux/UserCourseSlice";
import GetUserCourseComp from "../component/GetUserCourseComp";
import Pagination from "../../../../common/components/Pagination/Pagination";
import SearchComponent from "../../../../common/components/Pagination/Search";

export const route: () => RouteObject = () => {
  return {
    path: 'user-course',
    element: <UserCoursePage />,
  };
};

const UserCoursePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.userCourse.listUserCourse);
  const { totalPages, currentPage } = useAppSelector((state) => state.userCourse.pagination);
  const id = useAppSelector((s) => s.auth.user?.id);
  const [titleSearch, setSearch] = useState('');
  const [size, setSize] = useState(3);
  const [completionStatus, setCompletionStatus] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      console.log(id);
      dispatch(getUserAction());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      const request: GetUserCourseRequest = {
        studentId: id,
        titleSearch,
        page: currentPage,
        size,
        completionStatus,  // Thêm completionStatus vào request
      };
      console.log(id);
      dispatch(fetchUserCourse(request));
    }
  }, [dispatch, id, titleSearch, currentPage, size, completionStatus]);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === '' ? null : event.target.value;
    setCompletionStatus(value);
  };

  const handleSearch = (query: string) => {
    setSearch(query); 
  };
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
     <h1 className="text-4xl font-extrabold text-gray-900 mb-6">User Course</h1>
     <SearchComponent onSearch={handleSearch} placeholder="Search by title..." value={titleSearch} />
     <br />
      <label  className="block text-lg font-medium text-gray-700">
      Status Filter:
      <select 
            onChange={handleStatusChange} 
            value={completionStatus ?? ''} 
            className="p-2 text-gray-700 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">All Statuses</option>
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
        </select>

        
      </label>
      <GetUserCourseComp data={data!} />
      <Pagination 
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      
      />
    </div>
  );
};


export default UserCoursePage;
