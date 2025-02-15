import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { fetchOrder } from '../../data/redux/action/fetchOrder';
import { useParams } from 'react-router-dom';

const OrderDetail: React.FC = () => {
    const dispatch = useAppDispatch();
    const { orderDetail, status } = useAppSelector((state: RootState) => state.orderAdminSlice);
    const { orderId = '' } = useParams<{ orderId: string }>();
    
    var orID = Number.parseInt(orderId);

    useEffect(() => {
        dispatch(fetchOrder(orID));
    }, [dispatch, orID]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!orderDetail) {
        return <div>No order details found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Detail</h2>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Order ID: {orderDetail.data?.id}</h3>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600">Created At: {new Date(orderDetail.data?.createdAt ?? '').toLocaleDateString()}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600">User: {orderDetail.data?.user?.firstName} {orderDetail.data?.user?.lastName}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600">Course: {orderDetail.data?.course?.title}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600">Amount: ${orderDetail.data?.amount}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;