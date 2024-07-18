import React, { useEffect } from 'react';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../common/context/store';
import { fetchHomeworkDetail } from '../../../data/services/handleGetHomeworkDetail';
import UserHomework from './UserHomework';
import UserAward from './UserAward';

const HomeworkDetail = ({ homeworkId }: { homeworkId: number }) => {
  const dispatch = useAppDispatch();
  const {
    data: homework,
    status,
    error,
  } = useAppSelector((state) => state.courses.student.homeworkDetailComponent);

  useEffect(() => {
    if (homeworkId) {
      dispatch(fetchHomeworkDetail(Number(homeworkId)));
    }
  }, [homeworkId, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Homework Details</h2>
      <div>
        <h3 className="text-lg font-semibold">{homework?.title}</h3>
        <p>{homework?.description}</p>
        {homework?.questionDtos?.map((question) => (
          <div key={question.id}>
            <p>{question.questionText}</p>
            {question.answerDtos?.map((answer) => (
              <div key={answer.id}>
                <p>{answer.answerText}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      {homework?.userHomeworkDtos && <UserHomework />}
      {homework?.userAwardDtos && homework.userAwardDtos.length > 0 && (
        <UserAward />
      )}
    </div>
  );
};

export default HomeworkDetail;
