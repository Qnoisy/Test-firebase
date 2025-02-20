import { getDatabase, ref, remove } from 'firebase/database';
import { get } from 'http';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { app } from '../../firebase/firebase-config';
import { initialImageInterface } from './WriteImage';

const UpdateWriteImage: React.FC = () => {
	const [imagesArray, setImagesArray] = useState<initialImageInterface[]>([]);
	const navigate = useNavigate();

	const fetchData = async () => {
		const db = getDatabase(app);

		try {
			const dbRef = ref(db, `list/images`);
			toast.success('Data loaded successfully');
			const snapshot = await get(dbRef);
			if (snapshot.exists()) {
				const data = Object.entries(snapshot.val()).map(([id, value]) => ({
					...(value as initialImageInterface),
					imageId: id,
				}));
				setImagesArray(data);
			} else {
				toast.warn('No data found');
			}
		} catch (error: any) {
			console.error('Error getting documents:', error);
			toast.error(`Error: ${error.message}`);
		}
	};
	const deleteFruit = async (myId: string): Promise<void> => {
		const db = getDatabase(app);
		const dbRef = ref(db, `list/images/${myId}`);
		try {
			await remove(dbRef);
		} catch (err: any) {
			console.error('Error deleting document:', err);
			toast.error(`Error: ${err.message}`);
		}
	};

	return (
		<div className='container'>
			<h2>ReadData Component</h2>
			<p>This component is used for reading data from the database.</p>
			<ul>
				{imagesArray?.map((image: initialImageInterface, index: number) => {
					return (
						<li key={index}>
							{image.imageData}
							<button
								onClick={() => navigate(`/updateWriteImage/${image.imageId}`)}
							>
								Update
							</button>
							<button onClick={() => deleteFruit(image.imageId)}>delete</button>
						</li>
					);
				})}
			</ul>

			<button onClick={fetchData}>Get Data</button>
		</div>
	);
};
export default UpdateWriteImage;
