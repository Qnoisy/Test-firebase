import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase-config';

const SignIn: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordCopy, setPasswordCopy] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (passwordCopy !== password) {
			setError("passwords didn't match");
			return 0;
		}
		createUserWithEmailAndPassword(auth, email, password)
			.then(user => {
				console.log(user);
				setEmail('');
				setPassword('');
				setPasswordCopy('');
			})
			.catch(error => console.log(error));
	};

	return (
		<div className='register'>
			<h2>Register</h2>
			<form onSubmit={handlerSubmit}>
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
				<label htmlFor='signPasswordCopy'>
					Repeat your password:
					<input
						placeholder='Repeat password'
						onChange={e => setPasswordCopy(e.target.value)}
						type='password'
						id='signPasswordCopy'
						value={passwordCopy}
					/>
				</label>
				<button>Create</button>
				{error ? <p>{error}</p> : ''}
			</form>
		</div>
	);
};

export default SignIn;
