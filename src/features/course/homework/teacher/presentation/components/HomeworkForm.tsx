import React, { useState } from 'react';
import { useAppSelector } from '../../../../../../common/context/store';

interface HomeworkFormProps {
  initialTitle?: string;
  initialDescription?: string;
  onSubmit: (title: string, description: string) => void;
  isUpdate?: boolean;  
  homeworkId?: number;  
  onSubmitUpdate: (title: string, description: string) => void;
}

const HomeworkForm: React.FC<HomeworkFormProps> = ({
  initialTitle = '',
  initialDescription = '',
  isUpdate = false,
  homeworkId,
  onSubmit,
  onSubmitUpdate
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const {errors,status,error} = useAppSelector((s)=>s.homeworks.teacher.createHomeworkPage)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdate && homeworkId) {
      onSubmitUpdate(title, description); // Gọi API cập nhật với ID
    } else {
      onSubmit(title, description); // Gọi API tạo mới
    }
  };
  
const homeworkState = useAppSelector((s)=>s.homeworks.teacher.updateHomeworkPage)
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
         {errors?.title && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.title}</p>
            )}
              {homeworkState.errors?.title && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.title}</p>
            )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
            {errors?.description && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.description}</p>
            )}
                    {homeworkState.errors?.title && (
              <p className="text-red-500 text-xs italic mt-1">{errors?.title}</p>
            )}
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default HomeworkForm;
