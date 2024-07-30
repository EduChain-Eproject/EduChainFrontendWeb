import React from 'react';
import { UserHomework } from '../../../../common/entities/UserHomework';

interface UserHomeworkCompProps {
  data: UserHomework[];
  onView: (id: number) => void;
}

const UserHomeworkComp: React.FC<UserHomeworkCompProps> = ({ data, onView }) => {
  return (
    <div>
      <h2>User Homework Table</h2>
      <table>
        <thead>
          <tr>
            <th>O/N</th> {/* Row number column */}
            <th>Submission Date</th>
            <th>Progress</th>
            <th>Grade</th>
            <th>Is Submitted</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((homework, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Row number */}
              <td>{new Date(homework.submissionDate).toLocaleDateString()}</td>
              <td>{homework.progress}</td>
              <td>{homework.grade}</td>
              <td>{homework.isSubmitted ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => onView(homework.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserHomeworkComp;
