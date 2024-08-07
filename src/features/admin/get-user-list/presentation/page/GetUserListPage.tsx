import React, { useEffect, useState } from "react";
import { RouteObject } from "react-router-dom";
import GetUserListComp from "../component/GetUserListComp";
import { useAppDispatch, useAppSelector } from "../../../../../common/context/store";
import Pagination from "../../../../../common/components/Pagination/Pagination";
import { setPage } from "../../data/redux/GetUserListSlice";
import SearchComponent from "../../../../../common/components/Pagination/Search";
import { GetListUserReq, GetUserListAction } from "../../data/service/HandleGetUserList";
import { BlockOrUnBlockAction, BlockOrUnBlockReq } from "../../data/service/HandleBlockOrUnBlock";


export const route: () => RouteObject = () => {
    return {
      path: 'user-list',
      element: <GetUserListPage />,
    };
  };
  
  const GetUserListPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector((state) => state.getUserList.GetUserListState);
    const { totalPages, currentPage } = useAppSelector((state) => state.getUserList.pagination);
    const handlePageChange = (pageNumber: number) => {
      dispatch(setPage(pageNumber));
    };
    const blockOrUnblock = useAppSelector((state) => state.getUserList.blockResultState);
    const [size, setSize] = useState(3);
    const [nameSearch, setSearch] = useState('');
    console.log(data);
    useEffect(() => {
      const request: GetListUserReq = {
        nameSearch,
        page: currentPage,
        size,
      };
      dispatch(GetUserListAction(request));
    }, [dispatch, nameSearch, currentPage, size]);

  const handleSearch = (query: string) => {
    setSearch(query); 
  };
  
  const handleBlock = async (req:BlockOrUnBlockReq) =>{
      dispatch(BlockOrUnBlockAction(req))
  }
  useEffect(() => {
    // Re-fetch the user list when block/unblock action succeeds
    if (blockOrUnblock.status === 'succeeded') {
      const request: GetListUserReq = {
        nameSearch,
        page: currentPage,
        size,
      };
      dispatch(GetUserListAction(request));
    }
  }, [blockOrUnblock.status, dispatch, nameSearch, currentPage, size]);
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <span className="block sm:inline">{error}</span>
  </div>
  }

    return (<div>
      <SearchComponent onSearch={handleSearch} placeholder="Search by name..." value={nameSearch} />
       <GetUserListComp data={data!} onBlock={handleBlock} />
       <Pagination 
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />  
    </div>)
  }