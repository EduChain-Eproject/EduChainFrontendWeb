import { AuthRepository } from "../repositories/AuthRepository";

export default class ResetPassword{
    constructor(private authRepository:AuthRepository){}
    async excute(email:string){
        return await this.authRepository.sendMailResetPassword(email);
    }
}

export type ResetPasswordReq = {
    email:string;
}