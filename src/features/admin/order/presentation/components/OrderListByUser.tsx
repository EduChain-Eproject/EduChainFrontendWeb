import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchAllOrder } from '../../data/redux/action/fetchAllOrder';
import { Link, useParams } from 'react-router-dom';
import { fetchOrderByUser, GetOrderUserReq } from '../../data/redux/action/fetchOrderByUser';
import { getUserAction } from '../../../../auth/presentation/redux/AuthAction';
import SearchComponent from '../../../../../common/components/Pagination/Search';
import Pagination from '../../../../../common/components/Pagination/Pagination';
import { setPage } from '../../data/redux/orderAdminSlice';

const OrderListByUser: React.FC = () => {
    const dispatch = useAppDispatch();
    const { orders, status } = useAppSelector((state: RootState) => state.orderSlice);
    const role = useAppSelector((s)=>s.auth.user?.role)
    
    const user = useAppSelector((s) => s.auth.user)
    const [size, setSize] = useState(3);
    const { totalPages, currentPage } = useAppSelector((state) => state.orderSlice.pagination);
    const [titleSearch, setSearch] = useState('');
    const handleSearch = (query: string) => {
        setSearch(query); 
      };
      const handlePageChange = (pageNumber: number) => {
        dispatch(setPage(pageNumber));
      };
    useEffect(() => {
        const fetchData = async () => {
          try {
            await dispatch(getUserAction());
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        };
    
        fetchData();
      }, [dispatch]);

      useEffect(() => {
        if (user && user.id) {
            const req:GetOrderUserReq = {
                page:currentPage,
                size,
                titleSearch,
                userId:user.id
            }
            dispatch(fetchOrderByUser(req));
            console.log(req)
        }
    }, [dispatch, user,titleSearch]);
    

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!orders || orders.data?.length === 0) {
        return <div>No order details found.</div>;
    }

    const userName = `${orders?.data?.[0]?.user?.firstName} ${orders?.data?.[0]?.user?.lastName}`;

    return (
        
        <div className="max-w-4xl mx-auto py-8 px-4">
                  <SearchComponent onSearch={handleSearch} placeholder="Search by TitleL..." value={titleSearch} />
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order By {userName}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600">ID</th>
                            <th className="px-4 py-2 text-left text-gray-600">Created At</th>
                            <th className="px-4 py-2 text-left text-gray-600">User</th>
                            <th className="px-4 py-2 text-left text-gray-600">Course Title</th>
                            <th className="px-4 py-2 text-left text-gray-600">Amount</th>
                            <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data?.map((orderItem) => (
                            <tr key={orderItem.id} className="border-b">
                                <td className="px-4 py-2">{orderItem.id}</td>
                                <td className="px-4 py-2">{new Date(orderItem.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{orderItem.user?.firstName} {orderItem.user.lastName}</td>
                                <td className="px-4 py-2">{orderItem.course?.title}</td>
                                <td className="px-4 py-2">${orderItem.amount}</td>
                                <td className="px-4 py-2">
                                <Link to={role === 'STUDENT' || role === 'TEACHER' 
                                        ? `/profile/order/${orderItem.id}` 
                                        : `/dashboard/order/${orderItem.id}`}>
                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                            View Detail
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination 
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      /> 
        </div>
    );
};

export default OrderListByUser;