import React from 'react';
import { Question } from '../../../../../../common/entities/Question';

interface QuestionListProps {
  questions: Question[];
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium">Questions</h3>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question) => (
            <li key={question.id} className="mt-2">
              <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                <p>{question.questionText}</p>
                {question.answerDtos && (
                  <ul className="mt-2">
                    {question.answerDtos.map((answer) => (
                      <li
                        key={answer.id}
                        className={`p-2 rounded-md ${
                          answer.id === question.correctAnswerDto?.id
                            ? 'bg-green-200'
                            : 'bg-red-200'
                        }`}
                      >
                        {answer.answerText}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available</p>
      )}
    </div>
  );
};

export default QuestionList;
