export default interface IUser {
    id: number,
    name: string,
    email: string,
    image: File | null,
    password: string
}