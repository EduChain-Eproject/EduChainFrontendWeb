import Course from "./Course";
import User from "./User";

export enum CertificationStatus {
    PENDING = 'PENDING',
    CERTIFIED = 'CERTIFIED',
    REJECTED = 'REJECTED',
}
export class Certification {
    id: number | undefined;
    userDto: User | undefined;
    courseDTO: Course | undefined;
    status: CertificationStatus | undefined;
    issueDate: number[] | undefined;
    comments: string | undefined;
    transactionHash: string | undefined;
    nftTokenId: string | undefined;

    public static getDateString(date: number[]): string {
        const [year, month, day, hour, minute, second, nanosecond] = date;
        return new Date(Date.UTC(year, month - 1, day, hour, minute, second, nanosecond / 1000000)).toLocaleString();
    }
}
