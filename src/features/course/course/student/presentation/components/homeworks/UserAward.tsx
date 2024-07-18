import React from 'react';
import { useAppSelector } from '../../../../../../../common/context/store';

const UserAward: React.FC = () => {
  const { data: userAward } = useAppSelector(
    (state) => state.courses.student.userAwardComponent,
  );

  if (!userAward) return null;

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">User Award</h2>
      <p>Award for: {userAward.userDto?.email}</p>
      <p>comments: {userAward.comments}</p>
      <p>Date: {userAward.reviewDate}</p>
    </div>
  );
};

export default UserAward;
