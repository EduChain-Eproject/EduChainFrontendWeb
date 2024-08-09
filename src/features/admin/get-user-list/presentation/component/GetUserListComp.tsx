import React from "react";
import User from "../../../../../common/entities/User";
import { BlockOrUnBlockReq } from "../../data/service/HandleBlockOrUnBlock";

interface GetUserInterestCompProps {
  data: User[];
  onBlock: (req:BlockOrUnBlockReq) => void;
}

const GetUserListComp: React.FC<GetUserInterestCompProps> = ({ data,onBlock}) => {
  const handleBlockClick = (userId: number, blockValue: boolean) => {
    const req: BlockOrUnBlockReq = { userId, blockValue };
    onBlock(req);
  };
    return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">User List</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Avatar</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">First Name</th>
                  <th className="py-2 px-4 border-b">Last Name</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                  <th className="py-2 px-4 border-b">Address</th>
                  <th className="py-2 px-4 border-b">Role</th>
                  <th className="py-2 px-4 border-b">Active</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data && data.map((user, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">
                      <img src={user.avatarPath} alt="Avatar" className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.firstName}</td>
                    <td className="py-2 px-4 border-b">{user.lastName}</td>
                    <td className="py-2 px-4 border-b">{user.phone}</td>
                    <td className="py-2 px-4 border-b">{user.address}</td>
                    <td className="py-2 px-4 border-b">{user.role}</td>
                    <td className="py-2 px-4 border-b">{user.isActive ? "ACTIVE" : "UN_ACTIVE"}</td>
                    <td className="py-2 px-4 border-b">
                    <button
                    onClick={() => handleBlockClick(user.id, user.isActive)}
                    className={`px-4 py-2 rounded ${user.isActive ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
                  >
                    {user.isActive ? "Block" : "Unblock"}
                  </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };

export default GetUserListComp;
