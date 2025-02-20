import { getDatabase, ref, set } from 'firebase/database';
import { Formik, FormikHelpers } from 'formik';
import { get } from 'http';
import { useEffect, useState } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { app } from '../../firebase/firebase-config';
import { initialValuesInterface } from '../fruitbase/WriteFruit';
import MyFileInput from '../MyFileInput';
import { initialImageInterface, initialImageValues } from './WriteImage';

const UpdateImage: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [initialValuesImage, SetInitialValuesImage] =
		useState<initialImageInterface>({
			imageId: '',
			imageData: null,
		});

	useEffect(() => {
		if (!id) return;

		const fetchData = async () => {
			const db = getDatabase(app);
			try {
				const dbRef = ref(db, `list/images/${id}`);
				const snapshot = await get(dbRef);
				if (snapshot.exists()) {
					SetInitialValuesImage(snapshot.val());
					toast.success('Data loaded successfully');
				} else {
					toast.warn('No data found');
				}
			} catch (err: any) {
				console.error('Error fetching data:', err.message);
				toast.error(err.message);
			}
		};

		fetchData(); // 🔥 Добавили вызов fetchData
	}, [id]);

	const handlerOverwrite = async (
		data: initialValuesInterface,
		{ resetForm }: FormikHelpers<initialValuesInterface>
	) => {
		if (!id) return;
		const db = getDatabase(app);
		try {
			const newDocRef = ref(db, 'list/images');
			await set(newDocRef, data);
			toast.success('Updated successfully');
			navigate('/profile');
		} catch (error: any) {
			console.error('Error writing document:', error);
			toast.error(error.message);
		} finally {
			resetForm();
		}
	};

	return (
		<Formik initialValues={initialImageValues} onSubmit={handlerOverwrite}>
			<Form>
				<MyFileInput
					label='Change Image'
					name='changeImage'
					setFieldValue={SetInitialValuesImage}
				/>
			</Form>
		</Formik>
	);
};
export default UpdateImage;
