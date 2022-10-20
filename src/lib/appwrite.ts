import {
	Client,
	Account,
	ID,
	Databases,
	Storage,
	Role,
	Permission,
	Models,
	Functions,
	Avatars
} from 'appwrite';

export type { Models };
export { ID, Role, Permission };

const client = new Client()
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const db = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
export const avatars = new Avatars(client);

export default {
	account,
	client,
	ID,
	db,
	storage,
	Permission,
	Role,
	functions,
	avatars
};
