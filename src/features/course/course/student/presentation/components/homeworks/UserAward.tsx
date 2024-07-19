import React from 'react';
import { Link } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../common/context/store';
import { AwardStatus } from '../../../../../../../common/entities/Award';
import { receiveAward } from '../../../data/services/handleReceiveAward';

const UserAward = ({ homeworkId }: { homeworkId: number }) => {
  const dispatch = useAppDispatch();

  const { data: userAward } = useAppSelector(
    (state) => state.courses.student.userAwardComponent,
  );

  const handleReceiveAward = () => {
    dispatch(receiveAward({ homeworkId })); // TODO
  };

  if (!userAward) return null;

  return (
    <div>
      {userAward && (
        <div className="">
          <h2 className="text-xl font-bold">Award for you</h2>
          <p className="px-3 py-1 rounded-xl">
            {userAward.status == AwardStatus.PENDING ? (
              <p>Waiting for teacher to approve award</p>
            ) : userAward.status == AwardStatus.APPROVED ? (
              <button
                className="px-3 py-1 bg-blue-400 hover:bg-blue-700 rounded-2xl"
                onClick={handleReceiveAward}
              >
                Receive The Award
              </button>
            ) : userAward.status == AwardStatus.REJECTED ? (
              <p>Teacher Rejected</p>
            ) : (
              <Link to={``}>See your award</Link>
            )}
          </p>

          {userAward.comments && <p>comments: {userAward.comments}</p>}
          {/* <p>Date: {userAward.reviewDate.toDateString()}</p> */}
        </div>
      )}
    </div>
  );
};

export default UserAward;
