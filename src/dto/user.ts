export interface IUserDTO {
  id: string;
  email: string;
  username: string;
  registeredAt: Date;
}

export interface ICreateUserDTO {
  email: string;
  username: string;
  password: string;
}
