import React, { useState } from 'react';

interface QuestionFormProps {
  onSubmit: (
    questionText: string,
    answers: string[],
    correctAnswerIndex: number,
  ) => void;
  initialData?: {
    questionText: string;
    answers: string[];
    correctAnswerIndex: number;
  };
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [questionText, setQuestionText] = useState(
    initialData?.questionText || '',
  );
  const [answers, setAnswers] = useState(
    initialData?.answers || ['', '', '', ''],
  );
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(
    initialData?.correctAnswerIndex || 0,
  );

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(questionText, answers, correctAnswerIndex);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      {answers.map((answer, index) => (
        <div key={index} className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={`answer${index}`}
          >
            Answer {index + 1}
          </label>
          <input
            type="text"
            id={`answer${index}`}
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
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
          value={correctAnswerIndex}
          onChange={(e) => setCorrectAnswerIndex(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer != '' ? answer : `Answer ${index + 1}`}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default QuestionForm;
