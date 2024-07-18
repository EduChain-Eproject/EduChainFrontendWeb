import { AuthRepository } from '../repositories/AuthRepository';

export default class Register {
    constructor(private authRepository:AuthRepository){}
    async execute(registerData:RegisterReq){
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
  };


export type RegisterResponseMessage = {
    message:String;
}