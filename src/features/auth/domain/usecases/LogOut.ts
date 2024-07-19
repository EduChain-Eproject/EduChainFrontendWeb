import { AuthRepository } from '../repositories/AuthRepository';

export default class LogOut {
  constructor(private authRepository: AuthRepository) {}

  async execute(req: LogOutReq) {
    return await this.authRepository.onLogout(req);
  }
}

export type LogOutReq = {
  email: String;
};
