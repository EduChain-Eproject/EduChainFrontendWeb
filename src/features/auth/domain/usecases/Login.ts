import { User } from "../entities/User";
import { AuthRepository } from "../repositories/AuthRepository";

export default class Login {
    constructor(private authRepository:AuthRepository){}
    async execute(loginData:LoginReq){
        console.log(loginData)
        return await this.authRepository.onLogin(loginData);
    }
}


export type LoginReq = {
    email:String;
    password:String;
}

export type JwtResponse = {
    accessToken:String;
    refreshToken:String;
}

export type ApiResponse<T> = {
    object:T,
    message:String
}