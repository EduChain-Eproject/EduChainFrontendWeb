import React, { useEffect, useState } from 'react';
import Chapter from '../../../../../../common/entities/Chapter';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { useNavigate } from 'react-router-dom';
import { courseChaperDeleted } from '../../data/redux/courseSlice';
import { deleteChapter } from '../../../../chapter/teacher/data/services/handleDeleteChapter';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface ChapterListProps {
  chapters: Chapter[] | undefined;
  courseId: number;
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters, courseId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: deletedChapterId } = useAppSelector(
    (state) => state.chapters.teacher.deleteChapterPage,
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(courseChaperDeleted(deletedChapterId));
  }, [deletedChapterId, dispatch]);

  const handleUpdate = (chapterId: number) => {
    navigate(`/dashboard/teacher/chapters/update/${chapterId}`);
  };

  const handleDelete = (chapterId: number) => {
    setSelectedChapterId(chapterId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedChapterId !== null) {
      dispatch(deleteChapter(selectedChapterId));
      setShowModal(false);
    }
  };

  return (
    <div className="h-64 overflow-y-auto p-2">
      {chapters &&
        chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="flex justify-between items-center border-b last:border-b-0 py-2"
          >
            <span
              className="text-gray-700 cursor-pointer hover:text-blue-500"
              onClick={() =>
                navigate(`/dashboard/teacher/chapters/${chapter.id}`)
              }
            >
              {chapter.chapterTitle}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdate(chapter.id)}
                className="text-yellow-500 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(chapter.id)}
                className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Delete Chapter</h2>
            <p className="mb-4">Are you sure you want to delete this chapter?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterList;