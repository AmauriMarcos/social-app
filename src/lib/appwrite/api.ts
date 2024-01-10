import { INewUser } from "../../types";
import {account, ID} from './config';

export const createUserAccount = async(user: INewUser) => {
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        return newAccount;
    }catch(error){
        console.log(error);
        return error;
    }
}