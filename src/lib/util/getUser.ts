import appwrite from '@lib/appwrite';

export interface IUser {
	$id: string;
	$createdAt: string;
	name: string;
	email: string;
	avatar?: URL;
}

async function getUser(userId: string, useCache = true): Promise<IUser | null> {
	const cacheKey = `user-${userId}`;
	try {
		const cachedUser =
			useCache && JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
		if (!cachedUser) throw new Error();
		return cachedUser;
	} catch {
		const { response: userJson, statusCode } = await appwrite.functions.createExecution(
			'get-user-info',
			JSON.stringify({ userId })
		);
		const user = JSON.parse(userJson);
		const avatar =
			statusCode === 200 ? appwrite.avatars.getInitials(user.name, 128, 128) : null;
		if (statusCode === 200)
			sessionStorage.setItem(cacheKey, JSON.stringify({ ...user, avatar }));

		return statusCode === 200 ? { ...user, avatar } : null;
	}
}

export default getUser;
