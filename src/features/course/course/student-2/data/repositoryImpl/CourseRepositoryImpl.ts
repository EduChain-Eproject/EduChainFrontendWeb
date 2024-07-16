import Category from '../../domain/entities/Category';
import Chapter from '../../domain/entities/Chapter';
import Course from '../../domain/entities/Course';
import { CourseRepository } from '../../domain/repositories/CourseRepository';
import { CourseSearchParams } from '../../domain/usecases/SearchCourses';
import { CourseDto } from '../models/CourseDto';
import { apiGetCourseDetail, apiSearchCourses } from '../dataSources/courseRemoteDataSource'
import Page from '../../domain/entities/Page';
import Lesson from '../../domain/entities/Lesson';


export class CourseRepositoryImpl implements CourseRepository {
    async searchCourses(params: CourseSearchParams): Promise<{ data?: Page<Course>; error?: string }> {
        try {
            const response = await apiSearchCourses(params);
            const pageData = this.mapPageDtoToPage(response);
            return { data: pageData };
        } catch (error) {
            return { error: 'Failed to search courses' };
        }
    }

    async getCourseDetail(courseId: number): Promise<{ data?: Course; error?: string }> {
        try {
            const response = await apiGetCourseDetail(courseId);
            return { data: this.mapDtoToEntity(response) };
        } catch (error) {
            return { error: 'Failed to fetch course details' };
        }
    }

    private mapDtoToEntity(dto: CourseDto): Course {
        const course = new Course();
        course.id = dto.id;
        course.title = dto.title;
        course.description = dto.description;
        course.price = dto.price;
        course.status = dto.status;
        course.categories = dto.categoryDtos?.map(cate => {
            const category = new Category();
            category.id = cate.id;
            category.categoryName = cate.categoryName;
            return category;
        }) || [];
        course.chapters = dto.chapterDtos?.map(ct => {
            const chapter = new Chapter();
            chapter.id = ct.id;
            chapter.chapterTitle = ct.chapterTitle;
            chapter.lessons = ct.lessonDtos?.map(lessonDto => {
                const lesson = new Lesson();
                lesson.id = lessonDto.id;
                lesson.lessonTitle = lessonDto.lessonTitle;
                lesson.description = lessonDto.description;
                lesson.videoURL = lessonDto.videoURL;
                return lesson;
            }) || [];
            return chapter;
        }) || [];
        course.numberOfEnrolledStudents = dto.numberOfEnrolledStudents;
        course.relatedCourses = dto.relatedCourseDtos?.map(this.mapDtoToEntity) || [];
        return course;
    }


    private mapPageDtoToPage(pageDto: Page<CourseDto>): Page<Course> {
        return new Page<Course>(
            pageDto.content.map(this.mapDtoToEntity),
            pageDto.pageable,
            pageDto.totalPages,
            pageDto.totalElements,
            pageDto.last,
            pageDto.size,
            pageDto.number,
            pageDto.sort,
            pageDto.numberOfElements,
            pageDto.first,
            pageDto.empty
        );
    }
}

export default CourseRepositoryImpl;