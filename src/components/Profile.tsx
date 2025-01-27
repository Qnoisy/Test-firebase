import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase-config';

const Profile: React.FC = () => {
	const [authUser, setAuthUser] = useState<any>(null);
	const handlerLogout = () => {
		signOut(auth)
			.then(() => {
				console.log('User has signed out');
			})
			.catch(err => {
				console.log(err);
			});
	};
	useEffect(() => {
		const listen = onAuthStateChanged(auth, user => {
			if (user) {
				setAuthUser(user);
			} else {
				setAuthUser(null);
			}
		});
		return () => listen();
	});
	return (
		<div className='profile'>
			{authUser ? <h2>{`Welcome, ${authUser.email}`}</h2> : ''}
			{authUser ? <button onClick={handlerLogout}>Sign Out</button> : ''}
		</div>
	);
};

export default Profile;
