import { AuthRepository } from "../repositories/AuthRepository";

export default class ResetPassword {
  constructor(private authRepository: AuthRepository) {}
  async excute(req: ResetPasswordReq) {
    return await this.authRepository.onResetPassword(req);
  }
}

export type ResetPasswordReq = {
  email: string;
  password: string;
  code: string;
};