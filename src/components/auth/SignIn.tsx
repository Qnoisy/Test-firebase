import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebase-config';
import { schema } from '../../utils/shema';
import MyTextInput from '../MyTextInput';
import SignInWithGoogle from './SignInWithGoogle';

interface initialValuesInterface {
	email: string;
	password: string;
	passwordCopy: string;
}

const initialValues: initialValuesInterface = {
	email: '',
	password: '',
	passwordCopy: '',
};

const SignIn: React.FC = () => {
	const [error, setError] = useState<string | null>(null);

	const verifyEmail = async () => {
		if (!auth.currentUser) {
			console.error('No authenticated user found.');
			return;
		}
		try {
			auth.languageCode = 'pl';
			await sendEmailVerification(auth.currentUser);
			toast.success('Verification email sent!');
		} catch (error: any) {
			console.error('Failed to send email verification:', error.message);
			toast.error(error.message);
		}
	};

	const handlerSubmit = async (
		data: initialValuesInterface,
		{ resetForm }: any
	) => {
		setError(null);

		if (data.password !== data.passwordCopy) {
			setError("Passwords didn't match");
			toast.error("Passwords didn't match");
			return;
		}

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);
			console.log('User created:', userCredential.user);
			toast.success('User is created successfully');

			await verifyEmail();

			resetForm();
		} catch (error: any) {
			console.error('Error creating user:', error.message);
			setError(error.message);
			toast.error(error.message);
		}
	};

	return (
		<div className='register'>
			<h2>Register</h2>
			<Formik
				onSubmit={handlerSubmit}
				initialValues={initialValues}
				validationSchema={schema}
			>
				<Form>
					<MyTextInput
						label='Email:'
						name='email'
						placeholder='Enter email address'
						type='email'
					/>
					<MyTextInput
						label='Password:'
						name='password'
						placeholder='Enter password'
						type='password'
					/>
					<MyTextInput
						label='Repeat your password:'
						name='passwordCopy'
						placeholder='Enter password one more'
						type='password'
					/>
					<button type='submit'>Create</button>
					{error && <p style={{ color: 'red' }}>{error}</p>}
				</Form>
			</Formik>
			<br />
			<SignInWithGoogle />
		</div>
	);
};

export default SignIn;
