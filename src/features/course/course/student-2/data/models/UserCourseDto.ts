import {CompletionStatus} from '../../../../../../common/entities/UserCourse'

export class UserCourseDto {
    teacherName: string;
    teacherEmail: string;
    title: string;
    enrollmentDate: Date;
    price: number;
    completionStatus: CompletionStatus;

    constructor(
        teacherName: string,
        teacherEmail: string,
        title: string,
        enrollmentDate: Date,
        price: number,
        completionStatus: CompletionStatus,
    ) {
        this.teacherName = teacherName;
        this.teacherEmail = teacherEmail;
        this.title = title;
        this.enrollmentDate = enrollmentDate;
        this.price = price;
        this.completionStatus = completionStatus;
    }
}
