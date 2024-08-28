import React from 'react';
import Chapter from '../../../../../../common/entities/Chapter';

interface CurriculumProps {
  onLessonClick: (lessonId: number) => void;
  chapters?: Chapter[];
}

const Curriculum: React.FC<{ chapters: Chapter[]; onLessonClick: (lessonId: number) => void }> = ({ chapters, onLessonClick }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Curriculum</h2>
      {chapters && chapters.length > 0 ? (
        <ul className="space-y-4">
          {chapters.map((chapter) => (
            <li key={chapter.id} className="border p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{chapter.chapterTitle}</h3>
              <ul className="list-disc ml-5 space-y-2">
                {chapter.lessonDtos?.map((lesson) => (
                  <li
                    onClick={() => onLessonClick(lesson.id)}
                    key={lesson.id}
                    className="cursor-pointer hover:text-blue-500"
                  >
                    {lesson.lessonTitle}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No chapters available.</p>
      )}
    </div>
  );
};

export default Curriculum;
