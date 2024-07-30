import React, { useEffect, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../common/context/store';
import { clearErrorStatus } from '../../../data/redux/courseSlice';
import { answerAQuestion } from '../../../data/services/handleAnswerAQuestion';
import { submitHomework } from '../../../data/services/handleSubmitHomework';
import UserHomework from './UserHomework';

const HomeworkInProgress = () => {
  const dispatch = useAppDispatch();
  const { data: homework } = useAppSelector(
    (state) => state.courses.student.homeworkDetailComponent,
  );

  const { error, status } = useAppSelector(
    (state) => state.courses.student.userHomeworkComponent,
  );

  const handleAnswerChange = (questionId: number, answerId: number) => {
    const question = homework?.questionDtos?.find((q) => q.id === questionId);
    const currentUserAnswer = question?.currentUserAnswerDto;

    if (
      !currentUserAnswer ||
      (currentUserAnswer.answerId !== answerId && homework?.id)
    ) {
      dispatch(
        answerAQuestion({
          homeworkId: homework?.id ?? -1,
          questionId,
          answerId,
        }),
      );
    }
  };

  const handleSubmitHomework = () => {
    if (
      homework?.questionDtos?.every((question) => question.currentUserAnswerDto)
    ) {
      dispatch(submitHomework(homework?.id));
    } else {
      alert('Please answer all questions before submitting.');
    }
  };

  return (
    <div>
      <div onClick={() => dispatch(clearErrorStatus('userHomeworkComponent'))}>
        <div className="flex flex-row justify-between items-start">
          <div className="">
            <h3 className="text-lg font-semibold">{homework?.title}</h3>
            <p>{homework?.description}</p>
          </div>
          <UserHomework />
        </div>
        {homework?.questionDtos?.map((question) => (
          <div key={question.id} className="mt-4">
            <p className="font-medium">{question.questionText}</p>
            <div className="pl-4">
              {question.answerDtos?.map((answer) => (
                <div key={answer.id} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={answer.id}
                      defaultChecked={
                        question.currentUserAnswerDto?.answerId === answer.id
                      }
                      onChange={() =>
                        handleAnswerChange(question.id, answer.id)
                      }
                      className="mr-2"
                    />
                    <span>{answer.answerText}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          className="px-5 py-2 rounded-xl bg-meta-3 hover:bg-meta-5"
          onClick={handleSubmitHomework}
        >
          Submit
        </button>
        <p className="text-meta-1 text-lg">{error && error}</p>
      </div>
    </div>
  );
};

export default HomeworkInProgress;
