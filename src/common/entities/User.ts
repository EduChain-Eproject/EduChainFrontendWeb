import { Role } from "../../features/auth/domain/usecases/Register";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    avatarPath: string;
    phone: string;
    address: string;role: Role;
    email: string;
}