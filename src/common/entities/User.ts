export class User {
    email: string;
    role: string
    constructor(role: string, email: string) {
        this.role = role;
        this.email = email;
    }
}