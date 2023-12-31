interface UserType {
    id?: number;
    username: string;
    password?: string;
    password_repeat?: string;
    email: string;
    firstname: string;
    lastname: string;
    token?: string;
}

export default UserType;