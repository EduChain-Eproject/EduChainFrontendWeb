import { AuthRepository } from '../repositories/AuthRepository';

export default class VerifyCode {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: number) {
    return await this.authRepository.onVerifyCode(data);
  }
}
