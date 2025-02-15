import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import Homework from '../../../../../../common/entities/Homework';
import { deleteHomework } from '../../../../homework/teacher/data/services/deleteHomework';
import { homeworkDeleted } from '../../data/redux/lessonSlice';

interface HomeworkListProps {
  homeworks: Homework[];
  handleClickHomework: () => void;
}

const HomeworkList: React.FC<HomeworkListProps> = ({
  homeworks,
  handleClickHomework,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: deletedHomeworkId } = useAppSelector(
    (state) => state.homeworks.teacher.deleteHomeworkPage,
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedHomeworkId, setSelectedHomeworkId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(homeworkDeleted(deletedHomeworkId));
  }, [deletedHomeworkId, dispatch]);

  const handleDelete = (id: number) => {
    setSelectedHomeworkId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedHomeworkId !== null) {
      dispatch(deleteHomework(selectedHomeworkId));
      setShowModal(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Homeworks</h2>
        <button
          onClick={handleClickHomework}
          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mt-4"
        >
          Create Homework
        </button>
      </div>
      {homeworks.length === 0 ? (
        <p>No homeworks available.</p>
      ) : (
        <ul className="space-y-4">
          {homeworks.map((homework) => (
            <li key={homework.id} className="border-b pb-4">
              <Link
                to={`/dashboard/teacher/homeworks/${homework.id}`}
                className="text-blue-500 hover:underline"
              >
                {homework.title}
              </Link>
              <p>{homework.description}</p>
              <div className="space-x-2 mt-2">
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/teacher/homeworks/update/${homework.id}`,
                    )
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(homework.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Delete Homework</h2>
            <p className="mb-4">Are you sure you want to delete this homework?</p>
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

export default HomeworkList;