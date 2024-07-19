import React from 'react';
import { useAppSelector } from '../../../../../../../common/context/store';
import Homework from '../../../../../../../common/entities/Homework';
import UserAward from './UserAward';
import UserHomework from './UserHomework';

const CompletedHomework = () => {
  const { data: homework } = useAppSelector(
    (state) => state.courses.student.homeworkDetailComponent,
  );

  return (
    <div>
      <div>
        <div className="flex flex-row justify-between items-start">
          <div>
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
                      checked={
                        question.currentUserAnswerDto?.answerId === answer.id
                      }
                      disabled
                      className="mr-2"
                    />
                    <span
                      className={
                        question.correctAnswerDto?.id === answer.id
                          ? 'text-green-500'
                          : question.currentUserAnswerDto?.answerId ===
                            answer.id
                          ? 'text-red-500'
                          : ''
                      }
                    >
                      {answer.answerText}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {homework?.id && <UserAward homeworkId={homework.id} />}
    </div>
  );
};

export default CompletedHomework;
