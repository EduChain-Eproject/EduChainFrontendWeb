import { AuthRepository } from '../repositories/AuthRepository';

export default class VerifyCode {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: VerifyRequest) {
    return await this.authRepository.onVerifyCode(data);
  }
}

export type VerifyRequest = {
  email: string;
  code: number;
};