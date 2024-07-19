import { useAppSelector } from '../../../../common/context/store';
import React from 'react';
import { Link } from 'react-router-dom';

const UserProfileComp: React.FC = () => {
  const { data } = useAppSelector((state) => state.userProfile.profilePage);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {data ? (
        <>
          <h2 className="text-3xl font-bold mb-8 text-center">User Profile</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
            <img
              src={data.avatarPath}
              alt="User Avatar"
              className="w-32 h-32 object-cover rounded-full mb-4 md:mb-0"
            />
            <div className="w-full">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Email:</h3>
                <p>{data.email}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">First Name:</h3>
                <p>{data.firstName}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Last Name:</h3>
                <p>{data.lastName}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Phone:</h3>
                <p>{data.phone}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Address:</h3>
                <p>{data.address}</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link
              to="/profile/update"
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
              Update Profile
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p>Loading user profile...</p>
        </div>
      )}
    </div>
  );
};

export default UserProfileComp;
