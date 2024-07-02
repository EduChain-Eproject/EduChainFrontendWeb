import React from 'react';
import Lesson from '../../domain/entities/Lesson';
import { useNavigate } from 'react-router-dom';

interface LessonListProps {
    lessons: Lesson[];
    onLessonClick: (lessonId: number) => void;
    onUpdateLesson: (lessonId: number) => void;
    onDeleteLesson: (lessonId: number) => void;
}

const LessonList: React.FC<LessonListProps> = ({ lessons, onLessonClick, onUpdateLesson, onDeleteLesson }) => {
    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Lessons</h2>
            <ul className="space-y-4">
                {lessons.map((lesson) => (
                    <li key={lesson.id} className="bg-white shadow rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div onClick={() => onLessonClick(lesson.id)} className="cursor-pointer">
                                <h3 className="text-lg font-semibold">{lesson.lessonTitle}</h3>
                                <p>{lesson.description}</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => onUpdateLesson(lesson.id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => onDeleteLesson(lesson.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LessonList;
