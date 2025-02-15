import { AuthRepository } from "../repositories/AuthRepository";

export default class GetUser {
    constructor(private authRepository:AuthRepository){}
    async execute(){
        return await this.authRepository.getUser();
    }
}

