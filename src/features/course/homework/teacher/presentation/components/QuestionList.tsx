import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Question } from '../../../../../../common/entities/Question';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { deleteQuestion } from '../../../../question/teacher/data/services/deleteHomework';
import { questionDeleted } from '../../data/redux/homeworkSlice';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface QuestionListProps {
  questions: Question[];
  handleClickQuestion: () => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  handleClickQuestion,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: deletedQuestionId } = useAppSelector(
    (state) => state.questions.teacher.deleteQuestionPage,
  );

  useEffect(() => {
    dispatch(questionDeleted(deletedQuestionId));
  }, [deletedQuestionId, dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch(deleteQuestion(id));
    }
  };

  return (
    <div className="mt-4 bg-gray-100 p-6 rounded-lg shadow-lg">
      <div className="flex flex-row justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Questions</h3>
        <button
          onClick={handleClickQuestion}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
        >
          <FaPlus className="mr-2" /> Create Question
        </button>
      </div>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question) => (
            <li key={question.id} className="mt-4 relative">
              <div className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/teacher/questions/update/${question.id}`,
                      )
                    }
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(question.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
                <p className="text-lg font-semibold">{question.questionText}</p>
                {question.answerDtos && (
                  <ul className="mt-4">
                    {question.answerDtos.map((answer) => (
                      <li
                        key={answer.id}
                        className={`p-2 my-2 rounded-md ${
                          answer.id === question.correctAnswerDto?.id
                            ? 'bg-green-400'
                            : 'bg-red-400'
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
        <p className="text-center text-gray-500">No questions available</p>
      )}
    </div>
  );
};

export default QuestionList;