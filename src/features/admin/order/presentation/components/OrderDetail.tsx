import React, { useEffect } from 'react';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../../../common/context/store';
import { fetchOrder } from '../../data/redux/action/fetchOrder';
import { useParams } from 'react-router-dom';

const OrderDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orderDetail, status } = useAppSelector(
    (state: RootState) => state.orderSlice,
  );
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
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
        Order Detail
      </h2>
      <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-8">
        <div className="flex flex-col md:flex-row items-start">
          {/* User Info Container */}
          <div className="flex-1 mb-8 md:mb-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Order ID:{' '}
                <span className="text-blue-700 font-bold">
                  {orderDetail.data?.id}
                </span>
              </h3>
              <div className="ml-4">
                <img
                  src={orderDetail.data?.user.avatarPath}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full border-2 border-gray-300"
                />
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-8">
        <div className="flex flex-col md:flex-row">
          {/* Text Content Container */}
          <div className="flex-1">
            <p className="text-lg text-gray-800 mb-4">
              <span className="font-semibold">Created At:</span> {new Date(orderDetail.data?.createdAt ?? '').toLocaleDateString()}
            </p>
            <p className="text-lg text-gray-800 mb-4">
              <span className="font-semibold">Buyer:</span> {orderDetail.data?.user?.firstName} {orderDetail.data?.user?.lastName}
            </p>
            <p className="text-lg text-gray-800 mb-4">
              <span className="font-semibold">Buyer Email:</span> {orderDetail.data?.user?.email}
            </p>
            <p className="text-lg text-gray-800 mb-4">
              <span className="font-semibold">Course:</span> {orderDetail.data?.course?.title}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold">Amount:</span> <span className="text-green-700 text-xl font-bold">${orderDetail.data?.amount}</span>
            </p>
          </div>

          {/* Course Avatar Container */}
          <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-8 flex justify-end">
            <img
              src={orderDetail.data?.course.avatarPath}
              alt="Course Avatar"
              className="w-32 h-32 object-cover rounded border-2 border-gray-300"
            />
          </div>
        </div>
      </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
