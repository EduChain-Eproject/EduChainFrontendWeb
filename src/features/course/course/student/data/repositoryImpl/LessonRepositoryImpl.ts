import Chapter from "../../domain/entities/Chapter";
import Course from "../../domain/entities/Course";
import Lesson from "../../domain/entities/Lesson";
import { LessonRepository } from "../../domain/repositories/LessonRepository";
import { LessonDTO } from '../models/LessonDto'
import { apiGetLessonDetail } from '../dataSources/lessonRemoteDataSource'

class LessonRepositoryImpl implements LessonRepository {
    async getLessonDetail(lessonId: number): Promise<{ data?: Lesson; error?: string }> {
        try {
            const response = await apiGetLessonDetail(lessonId);

            return { data: this.mapDtoToEntity(response) };
        } catch (error) {
            return { error: 'Failed to fetch lesson detail' };
        }
    }

    private mapDtoToEntity(dto: LessonDTO): Lesson {
        const lesson = new Lesson();
        lesson.id = dto.id;
        lesson.lessonTitle = dto.lessonTitle;
        lesson.description = dto.description;
        lesson.videoTitle = dto.videoTitle;
        lesson.videoURL = dto.videoURL;

        if (dto.chapterDto) {
            const chapter = new Chapter();
            chapter.id = dto.chapterDto.id;
            chapter.chapterTitle = dto.chapterDto.chapterTitle;
            if (dto.chapterDto.courseDto) {
                const course = new Course();
                course.id = dto.chapterDto.courseDto.id;
                course.title = dto.chapterDto.courseDto.title;

                chapter.course = course;
            }
            lesson.chapter = chapter;
        }

        console.log(lesson);

        return lesson;
    }
}

export default LessonRepositoryImpl;