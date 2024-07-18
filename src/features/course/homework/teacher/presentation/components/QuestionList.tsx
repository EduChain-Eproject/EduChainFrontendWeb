import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Question } from '../../../../../../common/entities/Question';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { deleteQuestion } from '../../../../question/teacher/data/services/deleteHomework';
import { questionDeleted } from '../../data/redux/homeworkSlice';

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
  }, [deletedQuestionId]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch(deleteQuestion(id)); // Uncomment and implement deleteQuestion action
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-lg font-medium">Questions</h3>
        <button
          onClick={handleClickQuestion}
          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mt-4"
        >
          Create Question
        </button>
      </div>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question) => (
            <li key={question.id} className="mt-2">
              <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                <p>{question.questionText}</p>
                <div className="space-x-2 mt-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/teacher/questions/update/${question.id}`,
                      )
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(question.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
                {question.answerDtos && (
                  <ul className="mt-2">
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
        <p>No questions available</p>
      )}
    </div>
  );
};

export default QuestionList;
