import { FC, useEffect } from 'react';
import { useAuth } from '@lib/contexts/AuthContext';
import appwrite from '@lib/appwrite';
import { RouteObject, useLocation, useNavigate } from 'react-router-dom';

const Logout: FC = () => {
	const user = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (user) {
			appwrite.account
				.deleteSession('current')
				.then(async () => {
					await user.refresh();
					navigate(location.state?.from?.pathname || '/');
				})
				.catch(async () => {
					await user.refresh();
					navigate(location.state?.from?.pathname || '/');
				});
		}
	}, []);
	return <h1>...</h1>;
};

const route: RouteObject = {
	path: '/logout',
	element: <Logout />
};

export default route;
