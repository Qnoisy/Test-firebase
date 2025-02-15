import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { toast } from 'react-toastify'; // Добавляем уведомления (опционально)
import { auth } from '../../firebase/firebase-config';

const SignInWithGoogle: React.FC = () => {
	const provider = new GoogleAuthProvider(); // Создаем провайдера 1 раз

	const signInWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			console.log('User:', result.user);
			toast.success(`Welcome, ${result.user.displayName || 'User'}!`);
		} catch (err: any) {
			console.error('Google Sign-In Error:', err);
			toast.error(err.message);
		}
	};

	return (
		<div>
			<button onClick={signInWithGoogle}>Sign In with Google</button>
		</div>
	);
};

export default SignInWithGoogle;
