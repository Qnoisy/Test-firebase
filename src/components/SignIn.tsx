import React, { useState } from 'react';

const SignIn: React.FC = () => {
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [passwordCopy, setPasswordCopy] = useState<string>();
	const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(event);
	};
	return (
		<div className='register'>
			<h2>Register</h2>
			<form onSubmit={handlerSubmit}>
				<label htmlFor='signEmail'>
					Email:
					<input type='email' id='signEmail' value={email} />
				</label>
				<label htmlFor='signPassword'>
					Password:
					<input type='password' id='signPassword' value={password} />
				</label>
				<label htmlFor='signPasswordCopy'>
					Repeat your password:
					<input type='password' id='signPasswordCopy' value={passwordCopy} />
				</label>
				<button>Create</button>
			</form>
		</div>
	);
};

export default SignIn;
