import React, { useEffect } from 'react';
import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import QuestionForm from '../components/QuestionForm';
import { createQuestion, resetcreateQuestionStatus } from '../../data/services/createQuestion';

export const route: () => RouteObject = () => {
  return {
    path: 'questions/create/homework/:homeworkId/',
    element: <QuestionCreatePage />,
  };
};

const QuestionCreatePage: React.FC = () => {
  const { homeworkId } = useParams<{ homeworkId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {error,status} = useAppSelector((s) => s.questions.teacher.createQuestionPage) 
  const breadCrumbItems = [
    { label: 'Home', href: '/dashboard/teacher' },
    { label: 'Course by you', href: '/dashboard/teacher/courses' },
    {
      label: `Create Question`,
      href: `/dashboard/teacher/questions/create/homework/${homeworkId}`,
    },
  ];

  const handleCreate = (
    questionText: string,
    answers: string[],
    correctAnswerIndex: number,
  ) => {
    dispatch(
      createQuestion({
        homeworkId: Number(homeworkId),
        questionText,
        answerTexts: answers.filter((a) => a !== ''),
        correctAnswerIndex,
      }),
    )
  };

  useEffect(()=>{
    if(status === 'succeeded'){
      dispatch(resetcreateQuestionStatus());
      navigate(`/dashboard/teacher/homeworks/${homeworkId}`);
    }
  })
  return (
    <div className="p-4">
      <AppBreadcrumb items={breadCrumbItems} />
      <div>{error}</div>
      <h1 className="text-2xl font-bold mb-4">Create Question</h1>
      <QuestionForm onSubmit={handleCreate} />
    </div>
  );
};

export default QuestionCreatePage;
