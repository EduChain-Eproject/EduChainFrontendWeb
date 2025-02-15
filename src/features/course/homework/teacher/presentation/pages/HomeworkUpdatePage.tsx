import React, { useEffect } from 'react';
import { RouteObject, useNavigate, useParams } from 'react-router-dom';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { updateHomework } from '../../data/services/updateHomework';
import { getHomeworkDetail } from '../../data/services/getHomeworkDetail';
import HomeworkForm from '../components/HomeworkForm';

export const route: () => RouteObject = () => {
  return {
    path: 'homeworks/update/:homeworkId/',
    element: <HomeworkUpdatePage />,
  };
};

const HomeworkUpdatePage: React.FC = () => {
  const { homeworkId } = useParams<{ homeworkId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error, data: homework } = useAppSelector((state) => state.homeworks.teacher.homeworkDetailPage);
  const homeworkState = useAppSelector((s)=>s.homeworks.teacher.updateHomeworkPage)
  useEffect(() => {
    dispatch(getHomeworkDetail(Number(homeworkId)));
  }, [homeworkId, dispatch]);

  const breadCrumbItems = [
    { label: 'Home', href: '/dashboard/teacher' },
    { label: 'Course by you', href: '/dashboard/teacher/courses' },
    {
      label: `Course ${homework?.lessonDto?.chapterDto?.courseDto?.title}`,
      href: `/dashboard/teacher/courses/${homework?.lessonDto?.chapterDto?.courseDto!.id}`,
    },
    {
      label: `Chapter ${homework?.lessonDto?.chapterDto?.chapterTitle}`,
      href: `/dashboard/teacher/chapters/${homework?.lessonDto?.chapterDto!.id}`,
    },
    {
      label: `Lesson ${homework?.lessonDto?.lessonTitle}`,
      href: `/dashboard/teacher/lessons/${homeworkId}`,
    },
    {
      label: `Homework ${homework?.title}`,
      href: `/dashboard/teacher/homeworks/${homeworkId}`,
    },
    {
      label: `Update Homework ${homework?.title}`,
      href: `/dashboard/teacher/homeworks/update/${homeworkId}`,
    },
  ];

  const handleUpdate = (title: string, description: string) => {
    console.log('update')
    dispatch(
      updateHomework({ homeworkId: Number(homeworkId), title, description })
    )
    .unwrap()
    .then((res) => {
      if (res.data) {
        navigate(`/dashboard/teacher/homeworks/${homeworkId}`);
      }
    });
  };


  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <AppBreadcrumb items={breadCrumbItems} />
      <h1 className="text-2xl font-bold mb-4">Update Homework</h1>
      {homework && (
        <HomeworkForm
          initialTitle={homework.title}
          initialDescription={homework.description}
          onSubmitUpdate={handleUpdate}
          isUpdate
          homeworkId={Number(homeworkId)} onSubmit={() =>{} } />
      )}
    </div>
  );
};

export default HomeworkUpdatePage;
