import React from 'react';
import { useAppSelector } from '../../../../../../../common/context/store';

const UserHomework: React.FC = () => {
  const { data: userHomework } = useAppSelector(
    (state) => state.courses.student.userHomeworkComponent,
  );

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">User Homework</h2>
      <p>Submission Date: {userHomework?.submissionDate}</p>
      <p>Progress: {userHomework?.progress}%</p>
      <p>Grade: {userHomework?.grade}</p>
      <p>Submitted: {userHomework?.isSubmitted ? 'Yes' : 'No'}</p>
      <div>
        {userHomework?.userAnswerDtos?.map((userAnswer) => (
          <div key={userAnswer.id}>
            <p>Question: {userAnswer.questionDto?.questionText}</p>
            <p>Answer: {userAnswer.answerDto?.answerText}</p>
            <p>Correct: {userAnswer.isCorrect ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHomework;
