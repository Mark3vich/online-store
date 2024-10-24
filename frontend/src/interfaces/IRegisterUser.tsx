import IUser from './IUser';

export default interface IRegisterUser extends IUser {
    confirmPassword: string;
}