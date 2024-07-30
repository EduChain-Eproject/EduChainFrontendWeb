import React, { useEffect, useState } from "react";
import { RouteObject } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../common/context/store";
import { getUserAction } from "../../../auth/presentation/redux/AuthAction";
import { GetUserCourseRequest } from "../../domain/usecase/GetUserCourseUseCase";
import { fetchUserCourse } from "../redux/UserCourseAction";

import { setPage } from "../redux/UserCourseSlice";
import GetUserCourseComp from "../component/GetUserCourseComp";
import Pagination from "../../../../common/components/Pagination/Pagination";

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

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <select onChange={handleStatusChange} value={completionStatus ?? ''}>
        <option value="">All Statuses</option>
        <option value="NOT_STARTED">Not Started</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <GetUserCourseComp data={data!} />
      <Pagination 
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        titleSearch={titleSearch}
        setSearch={setSearch}
      />
    </div>
  );
};


export default UserCoursePage;
