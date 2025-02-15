import React from 'react';
import User from '../../../../common/entities/User';

interface Props {
  teacher: User;
}

const BestTeacher: React.FC<Props> = ({ teacher }) => (
  <div className="best-teacher text-center py-8">
    <h2 className="text-3xl font-bold mb-6 text-purple-600">Best Teacher</h2>
    <div className="teacher-info p-6 bg-gradient-to-r from-purple-400 to-indigo-500 shadow-lg rounded-lg mx-auto max-w-md transform transition hover:-translate-y-2">
      <img
        src={teacher.avatarPath}
        alt={`${teacher.firstName} ${teacher.lastName}`}
        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
      />
      <h3 className="text-2xl font-bold text-white mb-2">
        {teacher.firstName} {teacher.lastName}
      </h3>
      <p className="text-indigo-100">{teacher.email}</p>
    </div>
  </div>
);

export default BestTeacher;
