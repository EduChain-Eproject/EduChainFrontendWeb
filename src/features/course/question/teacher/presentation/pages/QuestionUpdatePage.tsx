import React, { useEffect } from 'react';
import { RouteObject, useNavigate, useParams } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import { updateQuestion } from '../../data/services/updateQuestion';
import { getQuestionDetail } from '../../data/services/getQuestionDetail';
import QuestionUpdateForm from '../components/QuestionUpdateForm';
import { updateAnswer } from '../../data/services/updateAnswer';

export const route: () => RouteObject = () => {
  return {
    path: 'questions/update/:questionId/',
    element: <QuestionUpdatePage />,
  };
};

const QuestionUpdatePage: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: question, status } = useAppSelector(
    (state) => state.questions.teacher.questionDetailPage,
  );

  useEffect(() => {
    dispatch(getQuestionDetail(Number(questionId)));
  }, [questionId, dispatch]);

  const breadCrumbItems = [
    { label: 'Home', href: '/dashboard/teacher' },
    { label: 'Course by you', href: '/dashboard/teacher/courses' },
    {
      label: `Update Question`,
      href: `/dashboard/teacher/questions/update/${questionId}`,
    },
  ];

  const handleUpdateQuestion = (
    questionText: string,
    correctAnswerId: number,
  ) => {
    dispatch(
      updateQuestion({
        questionId: Number(questionId),
        questionText,
        correctAnswerId,
      }),
    )
      .unwrap()
      .then(() => {
        navigate(`/dashboard/teacher/homeworks/${question?.homeworkId}`);
      });
  };

  const handleUpdateAnswer = (answerId: number, answerText: string) => {
    dispatch(updateAnswer({ answerId, answerText }));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <AppBreadcrumb items={breadCrumbItems} />
      <h1 className="text-2xl font-bold mb-4">Update Question</h1>
      {question && (
        <QuestionUpdateForm
          onSubmitQuestion={handleUpdateQuestion}
          onSubmitAnswer={handleUpdateAnswer}
          initialData={{
            questionId: question.id,
            questionText: question.questionText,
            answers: question.answerDtos ?? [],
            correctAnswerId: question?.correctAnswerId ?? 0,
          }}
        />
      )}
    </div>
  );
};

export default QuestionUpdatePage;
