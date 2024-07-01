import React from 'react';
import Chapter from '../../domain/entities/Chapter';
import { useAppDispatch } from '../../../../../../common/context/store';

interface ChapterListProps {
    chapters: Chapter[] | undefined;
    courseId: number;
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters, courseId }) => {
    const dispatch = useAppDispatch();

    const handleUpdate = (chapterId: number) => {

    };

    const handleDelete = (chapterId: number) => {
        // dispatch(deleteChapter({ courseId, chapterId }));
    };

    return (
        <div className="h-64 overflow-y-auto border p-2">
            {chapters && chapters.map((chapter) => (
                <div key={chapter.id} className="flex justify-between items-center border-b last:border-b-0 py-2">
                    <span className="text-gray-700">{chapter.chapterTitle}</span>
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
