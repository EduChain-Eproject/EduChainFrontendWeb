import React from 'react';
import Chapter from '../../domain/entities/Chapter';

interface CurriculumProps {
    onLessonClick: (lessonId: number) => void;
    chapters?: Chapter[];
}

const Curriculum: React.FC<CurriculumProps> = ({ chapters, onLessonClick }) => {

    return (
        <div>
            <h2 className="text-xl font-bold">Curriculum</h2>
            {chapters && chapters.length > 0 ? (
                <ul>
                    {chapters.map(chapter => (
                        <li key={chapter.id}>
                            <strong>{chapter.chapterTitle}</strong>
                            <ul>
                                {chapter.lessons?.map(lesson => (
                                    <li onClick={() => onLessonClick(lesson.id)} key={lesson.id}>{lesson.lessonTitle}</li>
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
