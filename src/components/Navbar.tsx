import { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@lib/contexts/AuthContext';

const Navbar: FC = () => {
	const navigate = useNavigate();
	const auth = useAuth();
	const location = useLocation();

	return (
		<div className="flex items-center justify-between bg-teal-600 py-2 px-4 text-2xl font-bold text-white md:py-6 md:text-3xl lg:px-6 lg:py-6 lg:text-4xl">
			<span className="flex items-center gap-4">
				{location.pathname !== '/' && (
					<button
						className="rounded-full border border-transparent p-2 focus:border-gray-500"
						onClick={() => navigate(-1)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
							/>
						</svg>
					</button>
				)}
				<span className="hidden md:inline">Instantgram</span>
				<span className="inline md:hidden">IG</span>
			</span>
			{!auth.user ? (
				<Link
					to="/auth"
					className="mr-4 cursor-pointer text-xl text-white hover:text-gray-200"
				>
					Login / Register
				</Link>
			) : (
				<div className="flex items-center sm:gap-2 md:gap-4">
					<Link
						to="/new"
						className="mr-4 cursor-pointer text-xl text-white hover:text-gray-200"
					>
						New Post
					</Link>
					<Link
						to="/logout"
						onClick={e => {
							e.preventDefault();
							if ((window.navigator as any)?.notificatoin?.confirm)
								(window.navigator as any).notification.confirm(
									'Do you really want to log out?',
									() => {
										navigate('/logout', { state: { from: location } });
									},
									'Log out',
									['No', 'Yes']
								);
							else if (window.confirm('Do you really want to log out?')) {
								navigate('/logout', { state: { from: location } });
							}
						}}
						className="mr-4 cursor-pointer text-xl text-red-600 hover:text-red-500"
					>
						Logout
					</Link>
				</div>
			)}
		</div>
	);
};

export default Navbar;
