import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { get, getDatabase, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const useAdminCheck = () => {
	const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
	const auth = getAuth();
	const db = getDatabase();

	useEffect(() => {
		const checkAdmin = async (uid: string) => {
			const adminRef = ref(db, `admins/${uid}`);
			const snapshot = await get(adminRef);
			setIsAdmin(snapshot.exists());
		};
		console.log('check admin');

		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				checkAdmin(user.uid);
			} else {
				setIsAdmin(false);
			}
		});

		return () => unsubscribe();
	}, [auth, db]);

	return isAdmin;
};

export default useAdminCheck;
