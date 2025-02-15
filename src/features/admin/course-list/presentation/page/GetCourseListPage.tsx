import { RouteObject } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../common/context/store";
import { setPage } from "../../../get-user-list/data/redux/GetUserListSlice";
import React, { useEffect, useState } from "react";
import { GetCourseListAction, GetCourseListReq } from "../../data/service/HandleCourseList";
import Pagination from "../../../../../common/components/Pagination/Pagination";
import SearchComponent from "../../../../../common/components/Pagination/Search";
import GetCourseListComp from "../component/GetCourseListComp";

export const route: () => RouteObject = () => {
    return {
      path: 'course-list',
      element: <GetCorseListPage />,
    };
  };
  
  const GetCorseListPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector((state) => state.adminCourseList.GetcourseListState);
    const { totalPages, currentPage } = useAppSelector((state) => state.adminCourseList.pagination);
    const handlePageChange = (pageNumber: number) => {
      dispatch(setPage(pageNumber));
    };
    const [size, setSize] = useState(5);
    const [titleSearchs, setSearch] = useState('');
    useEffect(() => {
      const request: GetCourseListReq = {
        titleSearch:titleSearchs,
        page: currentPage,
        size,
      };
      dispatch(GetCourseListAction(request));
    }, [dispatch, currentPage,titleSearchs, size]);

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

    return (<div>
      <SearchComponent onSearch={handleSearch} placeholder="Search by title..." value={titleSearchs} />
       <GetCourseListComp data={data!} />
       <Pagination 
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />  
    </div>)
  }

  export default GetCorseListPage;