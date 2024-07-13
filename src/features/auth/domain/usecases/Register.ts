import { AuthRepository } from "../repositories/AuthRepository";


export default class Register {
    constructor(private authRepository:AuthRepository){}
    async execute(registerData:RegisterReq){
        console.log(registerData);
        return await this.authRepository.onRegister(registerData);
    }
}

export type RegisterReq = {
    email: string;  
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    password: string;
    role: Role;
  };

  export enum Role {
    STUDENT = 'STUDENT',
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
    SUPERVISOR = 'SUPERVISOR',
  }

export type RegisterResponseMessage = {
    message:String;
}