const sdk = require('node-appwrite');

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
	const client = new sdk.Client();
	const { userId } = JSON.parse(req.payload);

	// You can remove services you don't use
	const users = new sdk.Users(client);

	if (
		!req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
		!req.variables['APPWRITE_FUNCTION_API_KEY']
	) {
		console.warn(
			'Environment variables are not set. Function cannot use Appwrite SDK.'
		);
	} else {
		client
			.setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
			.setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
			.setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
			.setSelfSigned(true);
	}

	try {
		const user = await users.get(userId);
		if (!user) throw new Error();
		res.json({
			$id: user.$id,
			$createdAt: user.$createdAt,
			name: user.name,
			email: user.email
		});
	} catch {
		res.status(404).json({
			error: 'User not found'
		});
	}
};
