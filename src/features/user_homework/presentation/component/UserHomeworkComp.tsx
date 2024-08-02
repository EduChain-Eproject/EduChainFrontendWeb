import React from 'react';
import { UserHomework } from '../../../../common/entities/UserHomework';

interface UserHomeworkCompProps {
  data: UserHomework[];
  onView: (id: number) => void;
}

const UserHomeworkComp: React.FC<UserHomeworkCompProps> = ({ data, onView }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Homework Table</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left">O/N</th>
            <th className="py-3 px-4 border-b text-left">Submission Date</th>
            <th className="py-3 px-4 border-b text-left">Progress</th>
            <th className="py-3 px-4 border-b text-left">Grade</th>
            <th className="py-3 px-4 border-b text-center">Is Submitted</th>
          
          </tr>
        </thead>
        <tbody>
          {data.map((homework, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-center">{index + 1}</td>
              <td className="py-3 px-4 border-b">{new Date(homework.submissionDate).toLocaleDateString()}</td>
              <td className="py-3 px-4 border-b">{homework.progress}</td>
              <td className="py-3 px-4 border-b">{homework.grade}</td>
              <td className="py-3 px-4 border-b text-center">{homework.isSubmitted ? 'Yes' : 'No'}</td>
              <td className="py-3 px-4 border-b text-center">
           
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserHomeworkComp;
