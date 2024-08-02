import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, RouteObject } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import AppBreadcrumb from '../../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import { getChapterDetail } from '../../data/services/handleGetChapterDetail';
import {
  updateChapter,
  UpdateChapterReq,
} from '../../data/services/handleUpdateChapter';

export const route: () => RouteObject = () => {
  return {
    path: 'chapters/update/:chapterId',
    element: <UpdateChapterPage />,
  };
};

const UpdateChapterPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useAppSelector(
    (state) => state.chapters.teacher.chapterDetailPage,
  );
  const {status,errors,error}   = useAppSelector(
    (state) => state.chapters.teacher.updateChapterPage
  );
  const [chapterTitle, setChapterTitle] = useState<string>('');

  useEffect(() => {
    if (chapterId) {
      dispatch(getChapterDetail(Number(chapterId)));
    }
  }, [chapterId, dispatch]);

  useEffect(() => {
    if (data) {
      setChapterTitle(data.chapterTitle);
    }
  }, [data]);

  const handleSave = () => {
      const updatedChapter: UpdateChapterReq = {
        chapterTitle,
      };
      dispatch(
        updateChapter({
          chapterId: Number(chapterId),
          chapterData: updatedChapter,
        }),
      )
  };

  useEffect(() => {
    console.log(status)
    if (status === 'succeeded') {
      navigate(`/dashboard/teacher/chapters/${chapterId}`);
    }
  }, [status, chapterId, navigate]);

  const breadCrumbItems = [
    {
      label: 'Home',
      href: '/dashboard/teacher',
    },
    {
      label: 'Course by you',
      href: '/dashboard/teacher/courses',
    },
    {
      label: `Course ${data?.courseDto?.title}`,
      href: `/dashboard/teacher/courses/${data?.courseDto!.id}`,
    },
    {
      label: `Chapter ${data?.chapterTitle}`,
      href: `/dashboard/teacher/chapters/${chapterId}`,
    },
    {
      label: `Update`,
      href: `/dashboard/teacher/chapters/update/${chapterId}`,
    },
  ];

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <AppBreadcrumb items={breadCrumbItems} />
      <div className="bg-white shadow rounded-lg p-6">
       <div> {error}</div>
        <h1 className="text-2xl font-bold mb-4">Update Chapter</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Chapter Title
          </label>
          <input
            type="text"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
                   {errors?.chapterTitle && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.chapterTitle}</p>
            )}
        </div>
        <div className="space-x-2">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => navigate(`/dashboard/teacher/chapters/${chapterId}`)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateChapterPage;
