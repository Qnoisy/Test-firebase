import { get, getDatabase, ref, set } from 'firebase/database';
import {
	deleteObject,
	getDownloadURL,
	getStorage,
	ref as storageRef,
	uploadBytes,
} from 'firebase/storage';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { app } from '../../firebase/firebase-config';
import MyFileInput from '../UI/MyFileInput';

const UpdateWriteImage: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [currentImage, setCurrentImage] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		const fetchImage = async () => {
			const db = getDatabase(app);
			const dbRef = ref(db, `images/${id}`);

			try {
				const snapshot = await get(dbRef);
				if (snapshot.exists()) {
					setCurrentImage(snapshot.val().imageUrl);
				} else {
					toast.warn('No image found');
				}
			} catch (err: any) {
				console.error('Error fetching image:', err.message);
				toast.error(err.message);
			}
		};

		fetchImage();
	}, [id]);

	const uploadImage = async (file: File): Promise<string | null> => {
		try {
			const storage = getStorage(app);
			const fileRef = storageRef(storage, `images/${file.name}`);
			await uploadBytes(fileRef, file);
			return await getDownloadURL(fileRef);
		} catch (error) {
			console.error('Error uploading image:', error);
			toast.error('Error uploading image');
			return null;
		}
	};

	const handlerSubmit = async (
		values: { imageFile: File | null },
		{ resetForm }: FormikHelpers<{ imageFile: File | null }>
	) => {
		if (!id || !values.imageFile) {
			toast.error('Invalid image data');
			return;
		}

		const db = getDatabase(app);
		const storage = getStorage(app);
		const dbRef = ref(db, `list/images/${id}`);

		try {
			// Удаляем старое изображение
			if (currentImage) {
				const oldImageRef = storageRef(storage, currentImage);
				await deleteObject(oldImageRef);
			}

			// Загружаем новое изображение
			const imageUrl = await uploadImage(values.imageFile);
			if (!imageUrl) return;

			// Обновляем запись в БД
			await set(dbRef, { imageId: id, imageUrl });

			toast.success('Image updated successfully');
			navigate('/updateImage');
		} catch (error: any) {
			console.error('Error updating image:', error);
			toast.error(error.message);
		} finally {
			resetForm();
		}
	};

	return (
		<div className='container'>
			<h2>Update Image</h2>
			{currentImage && <img src={currentImage} alt='Current' width='150' />}
			<Formik
				initialValues={{ imageFile: null } as { imageFile: File | null }}
				onSubmit={handlerSubmit}
			>
				{({ setFieldValue }) => (
					<Form>
						<MyFileInput
							label='Select new image'
							name='imageFile'
							setFieldValue={setFieldValue}
						/>
						<button type='submit'>Update Image</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default UpdateWriteImage;
