import React, { useEffect } from 'react';
import Chapter from '../../../../../../common/entities/Chapter';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { useNavigate } from 'react-router-dom';
import { courseChaperDeleted } from '../../data/redux/courseSlice';
import { deleteChapter } from '../../../../chapter/teacher/data/services/handleDeleteChapter';

interface ChapterListProps {
  chapters: Chapter[] | undefined;
  courseId: number;
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters, courseId }) => {
  const dispatch = useAppDispatch();
  const nagivate = useNavigate();
  const { data: deletedChapterId } = useAppSelector(
    (state) => state.chapters.teacher.deleteChapterPage,
  );

  useEffect(() => {
    dispatch(courseChaperDeleted(deletedChapterId));
  }, [deletedChapterId]);

  const handleUpdate = (chapterId: number) => {
    nagivate(`/dashboard/teacher/chapters/update/${chapterId}`);
  };

  const handleDelete = (chapterId: number) => {
    dispatch(deleteChapter(chapterId));
  };

  return (
    <div className="h-64 overflow-y-auto border p-2">
      {chapters &&
        chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="flex justify-between items-center border-b last:border-b-0 py-2"
          >
            <span
              className="text-gray-700"
              onClick={() =>
                nagivate(`/dashboard/teacher/chapters/${chapter.id}`)
              }
            >
              {chapter.chapterTitle}
            </span>
            <div>
              <button
                onClick={() => handleUpdate(chapter.id)}
                className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(chapter.id)}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChapterList;
