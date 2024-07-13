import Chapter from '../../domain/entities/Chapter';
import { ChapterRepository } from '../../domain/repositories/ChapterRepository'
import { ChapterDTO } from '../models/ChapterDto';
import { apiCreateChapter, apiDeleteChapter, apiGetChapterDetail, apiUpdateChapter } from '../dataSources/chapterRemoteDataSource'
import Lesson from '../../domain/entities/Lesson'
import Course from '../../../../../../common/entities/Course';
import { UpdateChapterReq } from '../../domain/usecases/UpdateChapter';
import { CreateChapterReq } from '../../domain/usecases/CreateChapter';

export default class ChapterRepositoryImpl implements ChapterRepository {
    async getChapterDetail(chapterId: number): Promise<{ data?: Chapter; error?: string }> {
        try {
            const response = await apiGetChapterDetail(chapterId);
            return { data: this.mapDtoToEntity(response) };
        } catch (error) {
            return { error: 'Failed to get chapter detail' };
        }
    }

    async updateChapter(chapterId: number, chapterData: UpdateChapterReq): Promise<{ data?: Chapter; error?: string }> {
        try {
            const response = await apiUpdateChapter(chapterId, chapterData);
            return { data: this.mapDtoToEntity(response) };
        } catch (error) {
            return { error: 'Failed to update chapter' };
        }
    }

    async deleteChapter(chapterId: number): Promise<{ data?: number; error?: string }> {
        try {
            const response = await apiDeleteChapter(chapterId);
            return { data: response };
        } catch (error) {
            return { error: 'Failed to update chapter' };
        }
    }

    async createChapter(chapterData: CreateChapterReq): Promise<{ data?: Chapter; error?: string }> {
        try {
            const response = await apiCreateChapter(chapterData);
            return { data: this.mapDtoToEntity(response) };
        } catch (error) {
            return { error: 'Failed to create chapter' };
        }
    }


    private mapDtoToEntity(dto: ChapterDTO): Chapter {
        const chapter = new Chapter();
        chapter.id = dto.id;
        chapter.chapterTitle = dto.chapterTitle;

        if (dto.courseDto) {

            const course = new Course();
            course.id = dto.courseDto.id;
            course.title = dto.courseDto.title;
            chapter.course = course;

        }
        if (dto.lessonDtos) {
            chapter.lessons = dto.lessonDtos.map(ls => {
                const lesson = new Lesson();
                lesson.id = ls.id;
                lesson.description = ls.description;
                lesson.lessonTitle = ls.lessonTitle;
                lesson.videoTitle = ls.videoTitle;
                lesson.videoURL = ls.videoURL;

                return lesson;
            });
        }
        // Add mapping for courses and lessons if needed
        return chapter;
    }
}
