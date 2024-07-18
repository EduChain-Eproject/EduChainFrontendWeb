import { User } from "../../domain/entities/User";

export class UserDto extends User {
    id:number;
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    phone:string;
    address:string;
    role:string;
    avatarPath:string;
}