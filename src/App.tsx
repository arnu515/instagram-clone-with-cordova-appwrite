import { FC } from 'react';
import './App.css';

import { createHashRouter, RouterProvider } from 'react-router-dom';
import index from '@/pages/index';
import auth from '@pages/auth';
import logout from '@pages/logout';
import newPost from '@pages/new';
import post from '@pages/post';
import AuthProvider from '@lib/contexts/AuthContext';
import Layout from '@components/Layout';

const router = createHashRouter([
	{
		path: '/',
		element: <Layout />,
		children: [index, auth, logout, newPost, post]
	}
]);

const App: FC = () => {
	return (
		<>
			<AuthProvider>
				<RouterProvider router={router} fallbackElement={<h1>Loading</h1>} />
			</AuthProvider>
		</>
	);
};

export default App;
