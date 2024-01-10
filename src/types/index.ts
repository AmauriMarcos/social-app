
export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
}

export type INewUser = {
    name: string;
    username: string;
    email: string;
    password: string;
}