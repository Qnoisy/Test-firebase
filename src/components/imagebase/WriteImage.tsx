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
import MyFileInput from '../UI/MyFileInput';

export interface InitialImageInterface {
	imageId?: string;
	imageUrl?: string;
	imageFile?: File | null;
}

const initialImageValues: InitialImageInterface = {
	imageFile: null,
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
		{ setFieldValue, resetForm }: FormikHelpers<InitialImageInterface>
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

			// 🔥 Очищаем поле загрузки после отправки
			setFieldValue('imageFile', null);
			resetForm();
		} catch (error: any) {
			console.error('Error:', error);
			toast.error(error.message);
		}
	};

	return (
		<div className='container'>
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
		</div>
	);
};

export default WriteImage;
