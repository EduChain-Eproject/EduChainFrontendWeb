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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Interests Table</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th>Course ID</th>
            <th>Student ID</th>
            <th>Description</th>
            <th>Title</th>
            <th>Price</th>
            <th>Teacher Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((interest, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td>{interest.courseDto?.title}</td>
                <td>{interest.userDto?.email}</td>
                <td>{interest.courseDto?.title}</td>
                <td>{interest.courseDto?.description}</td>
                <td>{interest.courseDto?.price}</td>
                <td>
                  {interest.userDto?.firstName} {interest.userDto?.lastName}
                </td>

                <td>
                  <button
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
  );
};

export default GetUserInterestComp;
