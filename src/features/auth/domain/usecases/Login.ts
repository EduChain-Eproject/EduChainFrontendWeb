import { AuthRepository } from '../repositories/AuthRepository';

export default class Login {
  constructor(private authRepository: AuthRepository) {}

  async execute(loginData: LoginReq) {
    return await this.authRepository.onLogin(loginData);
  }
}

export type LoginReq = {
  email: String;
  password: String;
};

export type JwtResponse = {
  accessToken: String;
  refreshToken: String;
};
