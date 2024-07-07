
import Chapter from "../..//domain/entities/Chapter";
import Lesson from "../..//domain/entities/Lesson";
import Course from "../..//domain/entities/Course";
import { LessonRepository } from "../../domain/repositories/LessonRepository";
import { apiCreateLesson, apiDeleteLessonDetail, apiGetLessonDetail, apiUpdateLesson } from "../dataSources/lessonRemoteDataSource";
import { LessonDTO } from "../models/LessonDto";
import { UpdateLessonReq } from "../../domain/usecases/UpdateLesson";
import { CreateLessonReq } from "../../domain/usecases/CreateLesson";

class LessonRepositoryImpl implements LessonRepository {
    async getLessonDetail(lessonId: number): Promise<{ data?: Lesson; error?: string }> {
        try {
            const response = await apiGetLessonDetail(lessonId);

            return { data: this.mapDtoToEntity(response) };
        } catch (error) {
            return { error: 'Failed to fetch lesson detail' };
        }
    }

    async updateLesson(lessonId: number, lessonData: UpdateLessonReq): Promise<{ data?: Lesson; error?: string }> {
        try {
            const response = await apiUpdateLesson(lessonId, lessonData);
            return { data: this.mapDtoToEntity(response) };
        } catch (error) {
            return { error: 'Failed to update lesson' };
        }
    }

    async createLesson(lessonData: CreateLessonReq): Promise<{ data?: Lesson; error?: string }> {
        try {
            const response = await apiCreateLesson(lessonData);
            return { data: this.mapDtoToEntity(response) };
        } catch (error) {
            return { error: 'Failed to create lesson' };
        }
    }

    async deleteLesson(lessonId: number): Promise<{ data?: number; error?: string }> {
        try {
            const response = await apiDeleteLessonDetail(lessonId);
            return { data: response };
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

export default LessonRepositoryImpl