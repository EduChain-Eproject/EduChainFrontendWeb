export class UserProfileModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  avatarPath: string;
  role: string;

  constructor(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    avatarPath: string,
    role: string,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
    this.avatarPath = avatarPath;
    this.role = role;
  }
}
