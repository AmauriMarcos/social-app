import {Client, Account, Databases, Storage, Avatars} from 'appwrite';

export const appwriteConfig = {
    projectId: process.env.REACT_APP_APPWRITE_PROJECT_ID,
    url: process.env.REACT_APP_APPWRITE_URL,
    databaseId: process.env.REACT_APP_APPWRITE_DATATABASE_ID,
    storageId: process.env.REACT_APP_APPWRITE_STORAGE_ID,
    userCollectionId: process.env.REACT_APP_APPWRITE_USER_COLLECTION_ID,
    postCollectionId: process.env.REACT_APP_APPWRITE_POST_COLLECTION_ID,
    savesCollectionId: process.env.REACT_APP_APPWRITE_SAVES_COLLECTION_ID,

}

export const client = new Client();

client.setProject(appwriteConfig?.projectId!);
client.setEndpoint(appwriteConfig?.url!);

export const account = new Account(client);
export { ID, Query } from 'appwrite';
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars= new Avatars(client);