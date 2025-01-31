import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase-config';
import { schema } from '../utils/shema';
import MyTextInput from './MyTextInput';

interface initialValuesInterface {
	email: string;
	password: string;
}
const initialValues: initialValuesInterface = {
	email: '',
	password: '',
};
const SignUp: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const handlerLogin = async (values: initialValuesInterface) => {
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				values.email,
				values.password
			);
			console.log(user);
		} catch (error) {
			console.log(error);
			setError("Sorry we can't find your account");
		}
	};

	return (
		<div className='register'>
			<h2>LogIn</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={schema}
				onSubmit={handlerLogin}
			>
				<Form>
					<MyTextInput
						label='Email:'
						placeholder='Enter your email address'
						name='email'
						type='email'
					/>
					<MyTextInput
						label='Password:'
						placeholder='Enter your password'
						name='password'
						type='password'
					/>
					<button type='submit'>LogIn</button>
					{error ? <p>{error}</p> : ''}
				</Form>
			</Formik>
		</div>
	);
};

export default SignUp;
