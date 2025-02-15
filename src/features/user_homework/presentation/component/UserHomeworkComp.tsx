import React from 'react';
import { UserHomework } from '../../../../common/entities/UserHomework';

interface UserHomeworkCompProps {
  data: UserHomework[];
  onView: (id: number) => void;
}
const UserHomeworkComp: React.FC<UserHomeworkCompProps> = ({ data }) => {
  return (
    <div className="p-6 bg-gray-50 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">User Homework Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-4 px-6 border-b text-left">O/N</th>
              <th className="py-4 px-6 border-b text-left">Submission Date</th>
              <th className="py-4 px-6 border-b text-left">Progress</th>
              <th className="py-4 px-6 border-b text-left">Grade</th>
              <th className="py-4 px-6 border-b text-center">Is Submitted</th>
            </tr>
          </thead>
          <tbody>
            {data.map((homework, index) => (
              <tr key={index} className="hover:bg-gray-100">
            <td className="py-4 px-6 border-b font-medium text-gray-700 whitespace-nowrap">
  {index + 1}
</td>

                <td className="py-4 px-6 border-b text-gray-600">
                  {homework.submissionDate
                    ? new Date(homework.submissionDate).toLocaleDateString()
                    : "0/0/0"}
                </td>
                <td className="py-4 px-6 border-b text-gray-600">
                  {homework.progress || "N/A"}
                </td>
                <td className="py-4 px-6 border-b text-gray-600">
                  {homework.grade || "Unmarked"}
                </td>
                <td className="py-4 px-6 border-b text-center text-gray-600">
                  {homework.isSubmitted ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default UserHomeworkComp;
