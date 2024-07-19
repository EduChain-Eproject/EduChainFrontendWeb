import React from 'react';
import { useAppSelector } from '../../../../../../../common/context/store';

const UserHomework = () => {
  const { data: userHomework } = useAppSelector(
    (state) => state.courses.student.userHomeworkComponent,
  );

  return (
    <div className=" min-w-36">
      {userHomework && (
        <div className="">
          <h3 className="text-lg font-semibold">Progress</h3>
          <p>Progress: {userHomework.progress}%</p>
          {userHomework.grade != 0 && <p>Grade: {userHomework.grade}</p>}
          <p className="px-3 py-1 rounded-xl bg-orange-300">
            {userHomework.isSubmitted ? 'Submitted' : 'Unsubmitted'}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserHomework;
