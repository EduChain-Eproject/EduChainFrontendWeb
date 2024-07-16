import { User } from "./User";
import { Homework } from "./Homework";

export enum AwardStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export class Award {
    id: number;
    user: User | undefined;
    homework: Homework | undefined;
    status: AwardStatus; // PENDING, APPROVED, REJECTED
    submissionDate: Date;
    reviewDate: Date;
    comments: string; // Comments from the teacher
}