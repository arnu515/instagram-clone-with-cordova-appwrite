import { Navigate, useLocation } from 'react-router-dom';
import { FC, PropsWithChildren } from 'react';
import { useAuth } from '@lib/contexts/AuthContext';

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth();
	const location = useLocation();

	return user ? <>{children}</> : <Navigate to="/auth" state={{ from: location }} />;
};

export default RequireAuth;
