import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthForm: React.FC = () => {
	return (
		<div className='auth-form'>
			<h2>AuthForm</h2>
			<SignIn />
			<SignUp />
		</div>
	);
};
export default AuthForm;
