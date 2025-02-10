import { useField } from 'formik';
import React from 'react';
interface MyTextInputInterface
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
}
const MyTextInput: React.FC<MyTextInputInterface> = ({ label, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<>
			<label style={{ textAlign: 'center' }} htmlFor={props.id || props.name}>
				{label}
			</label>
			<input {...field} {...props} />
			{meta.touched && meta.error ? (
				<span style={{ color: 'red', fontSize: '12px' }}>{meta.error}</span>
			) : null}
		</>
	);
};

export default MyTextInput;
