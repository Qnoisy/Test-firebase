import { get, getDatabase, ref, remove } from 'firebase/database';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { app } from '../../firebase/firebase-config';
import { initialValuesInterface } from './WriteFruit';

const UpdateFruit: React.FC = () => {
	const [fruitsArray, setFruitsArray] = useState<initialValuesInterface[]>([]);
	const navigate = useNavigate();

	const fetchData = async () => {
		const db = getDatabase(app);
		try {
			const dbRef = ref(db, 'nature/fruits');
			const snapshot = await get(dbRef);
			if (snapshot.exists()) {
				const data = Object.entries(snapshot.val()).map(([myId, value]) => ({
					...(value as initialValuesInterface),
					fruitId: myId,
				}));
				setFruitsArray(data);
				toast.success('Data loaded successfully');
			} else {
				toast.warn('No data found');
			}
		} catch (err: any) {
			console.error('Error reading data from Firebase:', err);
			toast.error(`Error: ${err.message}`);
		}
	};
	const deleteFruit = async (myId: string): Promise<void> => {
		const db = getDatabase(app);
		const dbRef = ref(db, `nature/fruits/${myId}`);
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
				{fruitsArray?.map((fruit: initialValuesInterface, index: number) => {
					return (
						<li key={index}>
							{fruit.fruitName} - {fruit.fruitDefination} : {fruit.fruitId}
							<button
								onClick={() => navigate(`/updateWriteFruit/${fruit.fruitId}`)}
							>
								Update
							</button>
							<button onClick={() => deleteFruit(fruit.fruitId)}>delete</button>
						</li>
					);
				})}
			</ul>

			<button onClick={fetchData}>Get Data</button>
		</div>
	);
};
export default UpdateFruit;
