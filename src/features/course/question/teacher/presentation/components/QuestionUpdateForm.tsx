import React, { useState } from 'react';
import AnswerInput from './AnswerInput';

interface QuestionUpdateFormProps {
  onSubmitQuestion: (questionText: string, correctAnswerId: number) => void;
  onSubmitAnswer: (answerId: number, answerText: string) => void;
  initialData?: {
    questionId: number;
    questionText: string;
    answers: { id: number; answerText: string }[];
    correctAnswerId: number;
  };
}

const QuestionUpdateForm: React.FC<QuestionUpdateFormProps> = ({
  onSubmitQuestion,
  onSubmitAnswer,
  initialData,
}) => {
  const [questionText, setQuestionText] = useState(
    initialData?.questionText || '',
  );

  const answers = initialData?.answers.map((answer) => answer.answerText) || [
    '',
    '',
    '',
    '',
  ];

  const [correctAnswerId, setCorrectAnswerId] = useState(
    initialData?.correctAnswerId || 0,
  );

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitQuestion(questionText, correctAnswerId);
  };

  return (
    <form onSubmit={handleSubmitQuestion}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="questionText"
        >
          Question Text
        </label>
        <input
          type="text"
          id="questionText"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      {initialData?.answers.map((answer, index) => (
        <AnswerInput
          key={answer.id}
          answerId={answer.id}
          initialAnswerText={answers[index]}
          onSubmit={onSubmitAnswer}
        />
      ))}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="correctAnswerIndex"
        >
          Correct Answer
        </label>
        <select
          id="correctAnswerIndex"
          value={correctAnswerId}
          onChange={(e) => setCorrectAnswerId(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {initialData?.answers?.map((answer, index) => (
            <option key={index} value={answer.id}>
              {answer.answerText}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update Question
      </button>
    </form>
  );
};

export default QuestionUpdateForm;
