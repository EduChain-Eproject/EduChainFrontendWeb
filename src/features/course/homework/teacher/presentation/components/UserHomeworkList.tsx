import React from 'react';
import { UserHomework } from '../../../../../../common/entities/UserHomework';
import AwardDetail from './AwardDetail';
import { FaUser, FaCalendarAlt, FaChartLine, FaStar } from 'react-icons/fa';

interface UserHomeworkListProps {
  userHomeworks: UserHomework[];
  homeworkId: number;
}

const UserHomeworkList: React.FC<UserHomeworkListProps> = ({
  userHomeworks,
  homeworkId,
}) => {
  return (
    <div className="mt-4 bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">User Homeworks</h2>
      {userHomeworks.map((userHomework) => (
        <div
          key={userHomework.id}
          className="mt-4 p-6 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center mb-4">
            <FaUser className="text-blue-500 mr-2" />
            <p className="text-lg font-semibold">
              {userHomework.userDto?.firstName!}
            </p>
          </div>
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="text-blue-500 mr-2" />
            <p>
              <strong>Submission Date:</strong>{' '}
              {new Date(userHomework.submissionDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center mb-4">
            <FaChartLine className="text-blue-500 mr-2" />
            <p>
              <strong>Progress:</strong> {userHomework.progress}%
            </p>
          </div>
          <div className="flex items-center mb-4">
            <FaStar className="text-blue-500 mr-2" />
            <p>
              <strong>Grade:</strong> {userHomework.grade}
            </p>
          </div>
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