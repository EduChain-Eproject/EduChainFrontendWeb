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

  useEffect(() => {
    if (id) {
      dispatch(getUserAction());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      const request: GetUserCourseRequest = {
        student_id: id,
        titleSearch,
        page: currentPage,
        size,
      };
      dispatch(fetchUserCourse(request));
    }
  }, [dispatch, id, titleSearch, currentPage, size]);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
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
