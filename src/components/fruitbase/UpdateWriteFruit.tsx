import { get, getDatabase, ref, set } from 'firebase/database';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { app } from '../../firebase/firebase-config';
import MyTextInput from '../UI/MyTextInput';

export interface InitialValuesInterface {
	fruitName: string;
	fruitDefination: string;
}

const UpdateWriteFruit: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [initialValues, setInitialValues] = useState<InitialValuesInterface>({
		fruitName: '',
		fruitDefination: '',
	});

	useEffect(() => {
		const fetchData = async () => {
			if (!id) return;

			const db = getDatabase(app);
			try {
				const dbRef = ref(db, `nature/fruits/${id}`);
				const snapshot = await get(dbRef);
				if (snapshot.exists()) {
					const targetObject = snapshot.val();
					setInitialValues(targetObject);
					toast.success('Data loaded successfully');
				} else {
					toast.warn('No data found');
				}
			} catch (err: any) {
				console.error('Error fetching data:', err.message);
				toast.error(err.message);
			}
		};
		fetchData();
	}, [id]);

	const handlerOverwrite = async (
		values: InitialValuesInterface,
		{ setSubmitting }: FormikHelpers<InitialValuesInterface>
	) => {
		if (!id) return;

		const db = getDatabase(app);
		try {
			const newDocRef = ref(db, `nature/fruits/${id}`);
			await set(newDocRef, values);
			toast.success('Updated successfully');
			navigate('/profile');
		} catch (error: any) {
			console.error('Error writing document:', error);
			toast.error(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Formik initialValues={initialValues} onSubmit={handlerOverwrite}>
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
				<button type='submit'>Uppdate</button>
			</Form>
		</Formik>
	);
};

export default UpdateWriteFruit;
