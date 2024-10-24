import IUser from "./IUser";

export default interface ILoginUser extends Pick<IUser, 'email' | 'password'> {}