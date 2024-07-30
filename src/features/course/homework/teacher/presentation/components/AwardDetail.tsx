import React from 'react';
import { useAppDispatch } from '../../../../../../common/context/store';
import { Award, AwardStatus } from '../../../../../../common/entities/Award';
import {
  approveOrRejectAward,
  TeacherUpdatingAwardStatus,
} from '../../data/services/handleApproveOrRejectAward';

interface AwardDetailProps {
  award: Award;
  homeworkId: number;
}

const AwardDetail: React.FC<AwardDetailProps> = ({ award, homeworkId }) => {
  const dispatch = useAppDispatch();

  const handleUpdateStatus = (
    updatingAwardStatus: TeacherUpdatingAwardStatus,
  ) => {
    dispatch(
      approveOrRejectAward({
        updatingAwardStatus,
        awardId: award.id,
      }),
    );
  };

  return (
    <div className="mt-2 p-4 border rounded">
      <h3 className="text-lg font-semibold">Award</h3>
      <p>
        <strong>Status:</strong> {award.status}
      </p>
      <p>
        <strong>Comments:</strong> {award.comments}
      </p>
      {award.status === AwardStatus.PENDING && (
        <div className="mt-2 space-x-2">
          <button
            onClick={() =>
              handleUpdateStatus(TeacherUpdatingAwardStatus.APPROVE)
            }
            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Approve Award
          </button>
          <button
            onClick={() =>
              handleUpdateStatus(TeacherUpdatingAwardStatus.REJECT)
            }
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Reject Award
          </button>
        </div>
      )}
    </div>
  );
};

export default AwardDetail;
