import * as Yup from 'yup';

const regx = {
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

export const schema = Yup.object().shape({
	email: Yup.string().matches(regx.email, 'Incorrect email').required(),
	password: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.required(),
	passwordCopy: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required('Please confirm your password'),
});

export const schemaLogin = Yup.object().shape({
	email: Yup.string().matches(regx.email, 'Incorrect email').required(),
	password: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.required(),
});
