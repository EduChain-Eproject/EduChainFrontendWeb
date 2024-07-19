import React from 'react';
import { UserHomework } from '../../../../../../common/entities/UserHomework';
import AwardDetail from './AwardDetail';

interface UserHomeworkListProps {
  userHomeworks: UserHomework[];
  homeworkId: number;
}

const UserHomeworkList: React.FC<UserHomeworkListProps> = ({
  userHomeworks,
  homeworkId,
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">User Homeworks</h2>
      {userHomeworks.map((userHomework) => (
        <div key={userHomework.id} className="mt-4 p-4 border rounded">
          <p>
            <strong>User:</strong> {userHomework.userDto?.firstName}
          </p>
          <p>
            <strong>Submission Date:</strong>{' '}
            {new Date(userHomework.submissionDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Progress:</strong> {userHomework.progress}%
          </p>
          <p>
            <strong>Grade:</strong> {userHomework.grade}
          </p>
          {userHomework.isSubmitted && (
            <p className="text-green-600 font-bold">Submitted</p>
          )}
          {userHomework.userAwardDto && (
            <AwardDetail
              award={userHomework.userAwardDto}
              homeworkId={homeworkId}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default UserHomeworkList;
