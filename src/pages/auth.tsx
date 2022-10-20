import { FC, useEffect, useState } from 'react';
import {
	RouteObject,
	Form,
	ActionFunction,
	useActionData,
	useNavigate,
	useLocation
} from 'react-router-dom';
import Input from '@components/Input';
import appwrite from '@lib/appwrite';
import { useAuth } from '@lib/contexts/AuthContext';

const action: ActionFunction = async ({ request }) => {
	const fd = await request.formData();
	const email = (typeof fd.get('email') === 'string' ? fd.get('email') : '') as string;
	const password = (
		typeof fd.get('password') === 'string' ? fd.get('password') : ''
	) as string;
	const username = (
		typeof fd.get('username') === 'string' ? fd.get('username') : ''
	) as string;
	const mode = (typeof fd.get('mode') === 'string' ? fd.get('mode') : '') as string;

	try {
		if (mode === 'login') {
			await appwrite.account.createEmailSession(email, password);
			return { success: true };
		} else {
			await appwrite.account.create(appwrite.ID.unique(), email, password, username);
			await appwrite.account.createEmailSession(email, password);
			return { success: true };
		}
	} catch (e) {
		return { error: (e as any).message };
	}
};

const Auth: FC = () => {
	const [mode, setMode] = useState<'login' | 'register'>('login');
	const [error, setError] = useState<string | null>(null);
	const actionData = useActionData() as any;
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (actionData?.error) {
			setError(actionData.error);
		}

		if (actionData?.success) {
			auth.refresh().then(() => navigate(location.state?.from?.pathname ?? '/'));
		}
	}, [actionData, auth]);

	return (
		<>
			<div className="min-h-[100vh] bg-gray-100">
				<main className="flex flex-col items-center justify-center gap-2 pt-16 md:gap-4 md:pt-24 lg:pt-36">
					<h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
						Welcome to Instantgram!
					</h1>
					<p className="mt-4 text-xl font-medium md:text-2xl lg:text-3xl">
						{mode === 'register' ? 'Create' : 'Sign in to'} your account.
					</p>
					<Form
						method="post"
						className="mt-8 flex flex-col rounded-lg border border-teal-600 bg-white px-4 py-4 text-lg shadow-md md:px-9 md:py-5"
						replace
					>
						{error && (
							<div className="my-4 rounded-lg border border-red-500 bg-red-300 px-4 py-2 text-red-700">
								{error}
							</div>
						)}
						<div className="grid gap-y-4" style={{ gridTemplateColumns: '1fr 2fr' }}>
							<Input
								label="Email"
								type="email"
								id="email"
								name="email"
								placeholder="Your email"
								required
								customMessages={{
									valueMissing: 'Please enter your email',
									patternMismatch: 'Please enter a valid email'
								}}
								pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
							/>
							<Input
								label="Password"
								type="password"
								id="password"
								name="password"
								placeholder="Your password"
								required
								minLength={8}
								customMessages={{
									valueMissing: 'Please enter your password',
									tooShort: 'Password must be atleast 8 characters long'
								}}
							/>
							{mode === 'register' && (
								<Input
									label="Username"
									type="text"
									id="username"
									name="username"
									placeholder="Your username"
									required
									minLength={4}
									pattern={'[a-zA-z0-9_.-]+'}
									customMessages={{
										valueMissing: 'Please enter a username',
										tooShort: 'Username must be atleast 4 characters long',
										patternMismatch: 'Only letters, numbers, and _ . - are allowed'
									}}
								/>
							)}
							<input type="hidden" value={mode} name="mode" />
						</div>
						<div className="mt-4 flex w-full items-center justify-between">
							<button
								type="button"
								onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
								className="cursor-pointer font-mono text-teal-600 hover:text-teal-500"
							>
								{mode === 'register' ? 'Log in instead' : 'Create account'}
							</button>
							<button className="cursor-pointer rounded-lg bg-teal-600 px-4 py-2 font-mono text-white hover:bg-teal-500">
								{mode === 'register' ? 'Register' : 'Log in'}
							</button>
						</div>
					</Form>
				</main>
			</div>
		</>
	);
};

const route: RouteObject = {
	path: '/auth',
	element: <Auth />,
	action
};

export default route;
