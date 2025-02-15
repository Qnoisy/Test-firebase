import {
	deleteUser,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signOut,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebase-config';

const Profile: React.FC = () => {
	const [authUser, setAuthUser] = useState<any>(null);
	const resetPassword = async () => {
		try {
			await sendPasswordResetEmail(auth, authUser.email);
			toast('we send password reset email');
		} catch (err: any) {
			console.error('Error sending password reset email:', err);
			toast(`Error:`, err);
		}
	};
	const removeAccount = async () => {
		try {
			await deleteUser(authUser);
			console.log('deleted user');
		} catch (err) {
			console.error('error deleting', err);
		}
	};
	const handlerLogout = () => {
		signOut(auth)
			.then(() => {
				console.log('User has signed out');
				toast('User has signed out');
			})
			.catch(err => {
				console.error('Error signing out:', err);
				toast(`Error: ${err.message}`);
			});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setAuthUser(user);
		});
		return () => unsubscribe();
	}, []);

	return (
		<div className='profile'>
			{authUser && <h2>{`Welcome, ${authUser.email}`}</h2>}
			{authUser && (
				<button className='btn' onClick={handlerLogout}>
					Sign Out
				</button>
			)}
			<p>
				{authUser && (
					<button className='btn' onClick={removeAccount}>
						Delete account
					</button>
				)}

				{authUser && (
					<button className='btn' onClick={resetPassword}>
						Reset Password
					</button>
				)}
			</p>
		</div>
	);
};

export default Profile;
