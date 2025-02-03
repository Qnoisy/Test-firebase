import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase-config';
import { schema } from '../utils/shema';
import MyTextInput from './MyTextInput';

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

	const handlerSubmit = async (
		data: initialValuesInterface,
		{ resetForm }: any
	) => {
		if (data.password !== data.passwordCopy) {
			setError("passwords didn't match");
			toast('passwords didn`t match');
			return 0;
		}
		try {
			const user = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);
			console.log(user);
			toast('User is created successfully');
			resetForm();
		} catch (error) {
			console.log(error);
			toast(`err: ${error}`);
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
					{error ? <p>{error}</p> : ''}
				</Form>
			</Formik>
		</div>
	);
};

export default SignIn;
