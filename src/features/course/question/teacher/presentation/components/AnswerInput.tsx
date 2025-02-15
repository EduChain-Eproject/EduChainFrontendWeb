// src/components/AnswerInput.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';

interface AnswerInputProps {
  answerId: number;
  initialAnswerText: string;
  onSubmit: (answerId: number, answerText: string) => void;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  answerId,
  initialAnswerText,
  onSubmit,
}) => {
  const [answerText, setAnswerText] = useState(initialAnswerText);

  const handleSubmit = () => {
    onSubmit(answerId, answerText);
    
  };
  const{errors,status} = useAppSelector((s) => s.questions.teacher.updateAnswer)
  const error = errors?.[answerId];
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={`answer${answerId}`}
      >
        Answer
      </label>
      <input
        type="text"
        id={`answer${answerId}`}
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  
      />
             {errors?.answerText && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.answerText}</p>
            )}
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
      >
        Submit
      </button>
    </div>
  );
};

export default AnswerInput;
