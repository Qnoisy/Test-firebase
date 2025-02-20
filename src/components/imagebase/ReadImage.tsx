import { get, getDatabase, ref } from 'firebase/database';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { app } from '../../firebase/firebase-config';

interface InitialImageInterface {
	imageId: string;
	imageUrl: string;
}

const ReadImage: React.FC = () => {
	const [imagesArray, setImagesArray] = useState<InitialImageInterface[]>([]);

	const fetchData = async () => {
		const db = getDatabase(app);
		try {
			const dbRef = ref(db, 'list/images');
			const snapshot = await get(dbRef);
			if (snapshot.exists()) {
				const data = Object.entries(snapshot.val()).map(([id, value]) => ({
					...(value as InitialImageInterface),
					imageId: id,
				}));
				setImagesArray(data);
				toast.success('Data loaded successfully');
			} else {
				toast.warn('No data found');
			}
		} catch (error: any) {
			console.error('Error fetching data:', error.message);
			toast.error(error.message);
		}
	};

	return (
		<div className='container'>
			<h2>Read Images</h2>
			<button onClick={fetchData}>Get Data</button>
			<ul>
				{imagesArray.map(image => (
					<li key={image.imageId}>
						<img src={image.imageUrl} alt='Uploaded' width='150' />
					</li>
				))}
			</ul>
		</div>
	);
};

export default ReadImage;
