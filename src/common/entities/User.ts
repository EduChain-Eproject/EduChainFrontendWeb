import { Award } from "./Award";
import { UserHomework } from "./UserHomework";

export default class User {
    id: number;
    userAwards: Award[] | undefined;
    userHomeworks: UserHomework[] | undefined;
    email: string;
    role: string;
    constructor(role: string, email: string) {
        this.role = role;
        this.email = email;
    }
}