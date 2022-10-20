import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useEffect,
	useState
} from 'react';
import { Models } from 'appwrite';
import { account } from '@lib/appwrite';

interface IAuthContext {
	user: Models.Account<Models.Preferences> | null;
	refresh: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
	user: null,
	refresh: async () => {}
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<IAuthContext['user'] | undefined>(undefined);

	useEffect(() => {
		account
			.get()
			.then(u => {
				setUser(u);
			})
			.catch(() => setUser(null));
	}, []);

	const refresh = async () => {
		try {
			const user = await account.get();
			setUser(user ?? null);
		} catch {
			setUser(null);
		}
	};

	return (
		<AuthContext.Provider value={{ user: user ?? null, refresh }}>
			{typeof user !== 'undefined' && children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
