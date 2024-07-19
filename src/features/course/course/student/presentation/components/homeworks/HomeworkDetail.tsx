import React, { useEffect } from 'react';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../common/context/store';
import { fetchHomeworkDetail } from '../../../data/services/handleGetHomeworkDetail';
import CompletedHomework from './CompletedHomework';
import HomeworkInProgress from './HomeworkInProgress';

interface HomeworkDetailProps {
  homeworkId: number;
}

const HomeworkDetail: React.FC<HomeworkDetailProps> = ({ homeworkId }) => {
  const dispatch = useAppDispatch();
  const {
    data: homework,
    status,
    error,
  } = useAppSelector((state) => state.courses.student.homeworkDetailComponent);
  const { data: userAward } = useAppSelector(
    (state) => state.courses.student.userAwardComponent,
  );

  const { status: userHomeworkStatus, error: userHomeworkError } =
    useAppSelector((state) => state.courses.student.userHomeworkComponent);

  useEffect(() => {
    if (homeworkId) {
      dispatch(fetchHomeworkDetail(homeworkId));
    }
  }, [homeworkId, dispatch]);

  if (status === 'loading' || userHomeworkStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed' || userHomeworkStatus === 'failed') {
    return <div>Error: {error || userHomeworkError}</div>;
  }

  console.log(userAward);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Homework Details</h2>
      {homework && (
        <>{userAward ? <CompletedHomework /> : <HomeworkInProgress />}</>
      )}
    </div>
  );
};

export default HomeworkDetail;
