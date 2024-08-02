import User, { Role } from '../../../../common/entities/User';

export class UserDto extends User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  role: Role;
  avatarPath: string;
}
