import { getDatabase, push, ref, set } from 'firebase/database';
import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { app } from '../firebase/firebase-config';
import MyTextInput from './MyTextInput';

export interface initialValuesInterface {
	fruitName: string;
	fruitDefination: string;
	fruitId?: string;
}

export const initialValues: initialValuesInterface = {
	fruitName: '',
	fruitDefination: '',
	fruitId: '',
};
const WriteDataBase: React.FC = () => {
	const handlerSubmit = async (
		values: initialValuesInterface,
		{ resetForm }: FormikHelpers<initialValuesInterface>
	) => {
		const db = getDatabase(app);
		try {
			const newDocRef = push(ref(db, 'nature/fruits'));
			await set(newDocRef, {
				fruitName: values.fruitName,
				fruitDefination: values.fruitDefination,
			});
			console.log('work');
			toast.success('Saved');
			resetForm();
		} catch (error: any) {
			console.error('Error writing document: ', error);
			toast.error(error.message);
		}
	};
	return (
		<Formik initialValues={initialValues} onSubmit={handlerSubmit}>
			<Form>
				<MyTextInput
					label='Fruit Name'
					name='fruitName'
					placeholder='enter name fruit'
				></MyTextInput>
				<MyTextInput
					label='Fruit Defination'
					name='fruitDefination'
					placeholder='enter defination fruit'
				></MyTextInput>
				<button type='submit'>Send Data</button>
			</Form>
		</Formik>
	);
};
export default WriteDataBase;
