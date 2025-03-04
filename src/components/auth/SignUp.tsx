import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebase-config';
import { schemaLogin } from '../../utils/shema';
import MyTextInput from '../UI/MyTextInput';

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
	const navigete = useNavigate();
	const handlerLogin = async (
		values: initialValuesInterface,
		{ resetForm }: any
	) => {
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				values.email,
				values.password
			);

			console.log(user);
			toast('🦄 Wow so easy!');
			resetForm();
			navigete('/profile');
		} catch (error) {
			console.log(error);
			toast('Sorry we can`t find your account');
			setError("Sorry we can't find your account");
		}
	};

	return (
		<div className='register'>
			<h2>LogIn</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={schemaLogin}
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
