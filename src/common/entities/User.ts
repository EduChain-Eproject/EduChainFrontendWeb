export class User {
  id: number;
  email: string;
  role: string;
  constructor(role: string, email: string, id: number) {
    this.role = role;
    this.email = email;
    this.id = id;
  }
}