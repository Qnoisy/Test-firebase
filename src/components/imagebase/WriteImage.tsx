import { getDatabase, push, ref, set } from 'firebase/database';
import {
	getDownloadURL,
	getStorage,
	ref as storageRef,
	uploadBytes,
} from 'firebase/storage';
import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { app } from '../../firebase/firebase-config';
import MyFileInput from '../MyFileInput';

export interface InitialImageInterface {
	imageFile: File | null; // 🔥 Исправленный тип
}

const initialImageValues: InitialImageInterface = {
	imageFile: null, // 🔥 Теперь `initialValues` соответствует `values`
};

const WriteImage: React.FC = () => {
	const uploadImage = async (file: File): Promise<string | null> => {
		try {
			const storage = getStorage(app);
			const fileRef = storageRef(storage, `list/images/${file.name}`);
			await uploadBytes(fileRef, file);
			return await getDownloadURL(fileRef);
		} catch (error) {
			console.error('Error uploading image:', error);
			toast.error('Error uploading image');
			return null;
		}
	};

	const handlerSubmit = async (
		values: InitialImageInterface,
		{ resetForm }: FormikHelpers<InitialImageInterface>
	) => {
		const db = getDatabase(app);
		try {
			if (!values.imageFile) {
				toast.error('Please select an image');
				return;
			}

			const imageUrl = await uploadImage(values.imageFile);
			if (!imageUrl) return;

			const newDocRef = push(ref(db, 'list/images'));
			await set(newDocRef, { imageId: newDocRef.key, imageUrl });

			toast.success('Image uploaded successfully');
			resetForm(); // 🔥 Теперь resetForm() не вызывает ошибку
		} catch (error: any) {
			console.error('Error:', error);
			toast.error(error.message);
		}
	};

	return (
		<Formik initialValues={initialImageValues} onSubmit={handlerSubmit}>
			{({ setFieldValue, isSubmitting }) => (
				<Form>
					<MyFileInput
						label='Choose Image'
						name='imageFile'
						setFieldValue={setFieldValue}
					/>
					<button type='submit' disabled={isSubmitting}>
						{isSubmitting ? 'Uploading...' : 'Upload'}
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default WriteImage;
