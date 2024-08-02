import React from 'react';
import User from '../../../../common/entities/User';

interface Props {
  teacher: User;
}

const BestTeacher: React.FC<Props> = ({ teacher }) => (
  <div className="best-teacher text-center py-8">
    <h2 className="text-3xl font-bold mb-4">Best Teacher</h2>
    <div className="teacher-info p-6 bg-white shadow-lg rounded-lg mx-auto max-w-md transform transition hover:-translate-y-1">
      <h3 className="text-2xl mb-2">
        {teacher.firstName} {teacher.lastName}
      </h3>
      <p className="text-gray-700">{teacher.email}</p>
    </div>
  </div>
);

export default BestTeacher;
