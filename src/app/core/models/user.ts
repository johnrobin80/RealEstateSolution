export class User {
  id!: number;
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  token!: string;
}

// export class ILoginInterface {
//   UserName!: string;
//   Password!: string;
// }

// export class ILoginResponse {
//   Success!: boolean;
//   Message!: string;
//   StatusCode!: number;
//   ValidationErrors!: string[];
//   data!: ITokenData;
// }

// export class ITokenData {
//   FirstName!: string;
//   Token!: string;
// }

export interface ILoginInterface {
  UserName: string;
  Password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  statusCode: number;
  validationErrors: string[];
  data: ITokenData;
}

export interface ITokenData {
  userid: number;
  username: string;
  firstname: string;
  lastname: string;
  message: string;
  token: string;
}
