import { AuthRepository } from '../repositories/AuthRepository';

export default class ReSendVerifyCode {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: ReSendVerifyCodeReq) {
    return await this.authRepository.onReSendVerifyCode(email);
  }
}

export type ReSendVerifyCodeReq = {
  email: string;
};
