import Failure from '../../../../../../common/entities/Failure';
import Category from '../../domain/entities/Category';
import Chapter from '../../domain/entities/Chapter';
import Course from '../../domain/entities/Course';
import Page from '../../domain/entities/Page';
import { CourseRepository } from '../../domain/repositories/CourseRepository';
import { ChangeCourseStatusRequest } from '../../domain/usecases/DeactivateCourse';
import { GetCoursesByStatusRequest } from '../../domain/usecases/GetCoursesByStatus';
import { apiFetchCourseDetail, apiGetCoursesByStatus, apiDeactivateCourse } from '../dataSources/courseRemoteDataSource';
import { CourseDto } from '../models/CourseDto';

class CourseRepositoryImpl implements CourseRepository {
    async getCoursesByStatus(
        request: GetCoursesByStatusRequest
    ): Promise<{ data?: Page<Course>; error?: string }> {
        try {
            const response = await apiGetCoursesByStatus(request);
            const courses = this.mapPageDtoToPage(response);
            return { data: courses };
        } catch (error) {
            return { error: 'Failed to fetch courses' };
        }
    }

    async getCourseDetail(courseId: number): Promise<{ data?: Course; error?: string }> {
        try {
            const response = await apiFetchCourseDetail(courseId);
            const course = this.mapDtoToEntity(response);
            return { data: course };
        } catch (error) {
            if (error instanceof Failure) {
                return { error: error.message };
            }
            return { error: 'Unexpected error occurred' };
        }
    }


    async changeStatusOfCourse(
        req: ChangeCourseStatusRequest
    ): Promise<{ data?: Course; error?: string }> {
        try {
            const response = await apiDeactivateCourse(req);
            return { data: this.mapDtoToEntity(response) };
        } catch (error) {
            return { error: 'Failed to delete course' };
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
        });
        course.chapters = dto.chapterDtos?.map(ct => {
            const chapter = new Chapter();
            chapter.id = ct.id;
            chapter.chapterTitle = ct.chapterTitle;
            return chapter;
        });
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