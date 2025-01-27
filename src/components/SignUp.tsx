import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase-config';

const SignUp: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const handlerLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then(user => {
				console.log(user);
				setEmail('');
				setPassword('');
			})
			.catch(error => {
				console.log(error);
				setError("Sorry we can't find your account");
			});
	};

	return (
		<div className='register'>
			<h2>LogIn</h2>
			<form>
				<label htmlFor='signEmail'>
					Email:
					<input
						placeholder='Enter email address'
						onChange={e => setEmail(e.target.value)}
						type='email'
						id='signEmail'
						value={email}
					/>
				</label>
				<label htmlFor='signPassword'>
					Password:
					<input
						placeholder='Enter password'
						onChange={e => setPassword(e.target.value)}
						type='password'
						id='signPassword'
						value={password}
					/>
				</label>
				<button onClick={handlerLogin}>LogIn</button>
				{error ? <p>{error}</p> : ''}
			</form>
		</div>
	);
};

export default SignUp;
