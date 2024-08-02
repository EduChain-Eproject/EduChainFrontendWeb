import { AuthRepository } from '../repositories/AuthRepository';

export default class SendEmailResetPassword {
  constructor(private authRepository: AuthRepository) {}
  async execute(ResetEmailData: SendResetPasswordEmailReq) {
    return await this.authRepository.onSendResetPasswordEmail(ResetEmailData);
  }
}

export type SendResetPasswordEmailReq = {
  email: string;
};

// export enum Role {
//     STUDENT = 'STUDENT',
//     ADMIN = 'ADMIN',
//     TEACHER = 'TEACHER',
//     SUPERVISOR = 'SUPERVISOR',
// }

export type ResetEmailResponseMessage = {
  message: String;
};
