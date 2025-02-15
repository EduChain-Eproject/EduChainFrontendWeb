import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchAllOrder } from '../../data/redux/action/fetchAllOrder';
import { Link } from 'react-router-dom';
import AppPagination from '../../../../../common/components/Pagination/AppPagination';

interface OrderistProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const OrderList: React.FC<OrderistProps> = ({
    totalPages,
    currentPage,
    onPageChange,
}) => {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector((state: RootState) => state.orderAdminSlice);

    useEffect(() => {
        dispatch(fetchAllOrder());
    }, [dispatch]);

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600">ID</th>
                            <th className="px-4 py-2 text-left text-gray-600">Created At</th>
                            <th className="px-4 py-2 text-left text-gray-600">User</th>
                            <th className="px-4 py-2 text-left text-gray-600">Course</th>
                            <th className="px-4 py-2 text-left text-gray-600">Amount</th>
                            <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data?.map((orderItem) => (
                            <tr key={orderItem.id} className="border-b">
                                <td className="px-4 py-2">{orderItem.id}</td>
                                <td className="px-4 py-2">{new Date(orderItem.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2">
                                    <Link to={`/dashboard/order/user/${orderItem.user?.id}`}>
                                        {orderItem.user?.firstName} {orderItem.user?.lastName}
                                    </Link>
                                </td>
                                <td className="px-4 py-2">
                                    <Link to={`/dashboard/order/course/${orderItem.course?.id}`}>
                                        {orderItem.course?.title}
                                    </Link>
                                </td>
                                <td className="px-4 py-2">${orderItem.amount}</td>
                                <td className="px-4 py-2">
                                    <Link to={`/dashboard/order/${orderItem.id}`}>
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
            <AppPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default OrderList;