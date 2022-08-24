export interface IUser {
  uid: string;
  name: string;
}

export interface IUserDto {
  email: string;
  password: string;
}

export interface IUserCreateDto {
  name: string;
  email: string;
  password: string;
}
