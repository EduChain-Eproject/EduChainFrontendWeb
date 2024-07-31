import React from "react";
import { UserInterest } from "../../domain/entities/UserInterest";
import AppPagination from "../../../../common/components/Pagination/AppPagination";

interface GetUserInterestCompProps {
  data: UserInterest[];
  onDelete: (courseId: number, studentId: number) => void;
}

const GetUserInterestComp: React.FC<GetUserInterestCompProps> = ({ data, onDelete }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Interests Table</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left">O/N</th>
            <th className="py-3 px-4 border-b text-left">Description</th>
            <th className="py-3 px-4 border-b text-left">Title</th>
            <th className="py-3 px-4 border-b text-left">Price</th>
            <th className="py-3 px-4 border-b text-left">Teacher Name</th>
            <th className="py-3 px-4 border-b text-left">Category List</th>
            <th className="py-3 pl-10 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((interest, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-center">{index + 1}</td>
              <td className="py-3 px-4 border-b">{interest.description}</td>
              <td className="py-3 px-4 border-b">{interest.title}</td>
              <td className="py-3 px-4 border-b">{interest.price}</td>
              <td className="py-3 px-4 border-b">{interest.teacherName}</td>
              <td className="py-3 px-4 border-b">
                {interest.categoryList.map((category, idx) => (
                  <span key={idx} className="inline-block">
                    {category.categoryName}
                    {idx !== interest.categoryList.length - 1 && ', '}
                  </span>
                ))}
              </td>
              <td className="py-3 px-4 border-b text-center">
                <div className="flex justify-center items-center h-full">
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                    onClick={() => onDelete(interest.course_id, interest.student_id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


}

export default GetUserInterestComp;
