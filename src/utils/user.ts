export interface IUser {
    _id: number;
    email: string;
    password: string;
    role: string;
}

const tempUser: IUser = {
    _id: 1,
    email: "test@test.com",
    password: "password",
    role: "admin",
};

export default tempUser;