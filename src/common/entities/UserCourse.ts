export enum CompletionStatus {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export class UserCourse {
    userId: number;
    courseId: number;
    enrollmentDate: Date;
    completionStatus: CompletionStatus;
    progress: number;

    constructor(
        userId: number,
        courseId: number,
        enrollmentDate: Date,
        completionStatus: CompletionStatus,
        progress: number = 0
    ) {
        this.userId = userId;
        this.courseId = courseId;
        this.enrollmentDate = enrollmentDate;
        this.completionStatus = completionStatus;
        this.progress = progress;
    }
}
