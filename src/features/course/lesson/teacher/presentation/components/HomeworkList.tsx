import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../common/context/store';
import { Homework } from '../../../../../../common/entities/Homework';
import { deleteHomework } from '../../../../homework/teacher/data/services/deleteHomework';
import { homeworkDeleted } from '../../data/redux/lessonSlice';

interface HomeworkListProps {
  homeworks: Homework[];
}

const HomeworkList: React.FC<HomeworkListProps> = ({ homeworks }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: deletedHomeworkId } = useAppSelector(
    (state) => state.homeworks.teacher.deleteHomeworkPage,
  );

  console.log(deletedHomeworkId);

  useEffect(() => {
    dispatch(homeworkDeleted(deletedHomeworkId));
  }, [deletedHomeworkId]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this homework?')) {
      dispatch(deleteHomework(id));
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Homeworks</h2>
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
    </div>
  );
};

export default HomeworkList;
