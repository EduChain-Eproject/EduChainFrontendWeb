import React from 'react';
import User from '../../../../../../common/entities/User';

interface TeacherProps {
  teacher: User;
}

const Teacher: React.FC<TeacherProps> = ({ teacher }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Teacher Information</h2>
      {/* <p><strong>Name:</strong> {teacher.}</p> */}
      <p>
        <strong>Email:</strong> {teacher.email}
      </p>
      Add more teacher info as needed
    </div>
  );
};

export default Teacher;
