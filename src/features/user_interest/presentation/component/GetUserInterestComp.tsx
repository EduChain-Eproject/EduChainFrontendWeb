import React from 'react';
import UserInterest from '../../../../common/entities/UserInterest';

interface GetUserInterestCompProps {
  data: UserInterest[];
  onDelete: (courseId: number, studentId: number) => void;
}

const GetUserInterestComp: React.FC<GetUserInterestCompProps> = ({
  data,
  onDelete,
}) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Interests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Teacher Email</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Teacher Name</th>
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((interest, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b truncate max-w-xs">
                    <span className="block text-sm font-medium text-gray-900">
                      {interest.courseDto?.title}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {interest.courseDto?.teacherDto?.email}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {interest.courseDto?.description}
                  </td>
                  <td className="py-2 px-4 border-b">
                    ${interest.courseDto?.price?.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {interest.courseDto?.teacherDto?.firstName}{" "}
                    {interest.courseDto?.teacherDto?.lastName}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                      onClick={() =>
                        onDelete(
                          interest.courseDto?.id ?? 0,
                          interest.userDto?.id ?? 0,
                        )
                      }
                    >
                      Delete
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

export default GetUserInterestComp;
