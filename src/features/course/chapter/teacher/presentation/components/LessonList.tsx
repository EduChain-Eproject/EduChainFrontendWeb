import React, { useEffect, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import Lesson from '../../../../../../common/entities/Lesson';
import { lessonDeleted } from '../../data/redux/chapterSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface LessonListProps {
  lessons: Lesson[];
  onLessonClick: (lessonId: number) => void;
  onUpdateLesson: (lessonId: number) => void;
  onDeleteLesson: (lessonId: number) => void;
  onCreateClick: () => void;
}

const LessonList: React.FC<LessonListProps> = ({
  lessons,
  onLessonClick,
  onUpdateLesson,
  onDeleteLesson,
  onCreateClick,
}) => {
  const dispatch = useAppDispatch();
  const { data: deletedLessonId } = useAppSelector(
    (state) => state.lessons.teacher.deleteLessonPage,
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(lessonDeleted(deletedLessonId));
  }, [deletedLessonId, dispatch]);

  const handleDelete = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedLessonId !== null) {
      onDeleteLesson(selectedLessonId);
      setShowModal(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold mb-2">Lessons</h2>
        <button
          className="p-3 rounded-xl bg-meta-5 hover:bg-meta-3 text-white"
          onClick={onCreateClick}
        >
          Create new lesson
        </button>
      </div>
      <ul className="space-y-4">
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            className="bg-white shadow rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex justify-between items-center">
              <div
                onClick={() => onLessonClick(lesson.id)}
                className="cursor-pointer"
              >
                <h3 className="text-lg font-semibold hover:text-blue-500">
                  {lesson.lessonTitle}
                </h3>
                <p className="hover:text-blue-500">{lesson.description}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => onUpdateLesson(lesson.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(lesson.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Delete Lesson</h2>
            <p className="mb-4">Are you sure you want to delete this lesson?</p>
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

export default LessonList;