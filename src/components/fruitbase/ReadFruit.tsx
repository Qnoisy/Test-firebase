import { get, getDatabase, ref } from 'firebase/database';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { app } from '../../firebase/firebase-config';
import { initialValuesInterface } from './WriteFruit';

const ReadFruit: React.FC = () => {
	const [fruitsArray, setFruitsArray] = useState<initialValuesInterface[]>([]);

	const fetchData = async () => {
		const db = getDatabase(app);
		try {
			const dbRef = ref(db, 'nature/fruits');
			const snapshot = await get(dbRef);
			if (snapshot.exists()) {
				const data = Object.values(snapshot.val()) as initialValuesInterface[];
				setFruitsArray(data);
				toast.success('Data loaded successfully');
			} else {
				toast.warn('No data found');
			}
		} catch (err: any) {
			console.error('Error fetching data:', err.message);
			toast.error(err.message);
		}
	};
	// console.log(fruitsArray[0].fruitDefination);

	return (
		<div className='container'>
			<h2>ReadData Component</h2>
			<p>This component is used for reading data from the database.</p>
			<ul>
				{fruitsArray?.map((fruit: initialValuesInterface, index: number) => {
					return (
						<li key={index}>
							{fruit.fruitName} - {fruit.fruitDefination}
						</li>
					);
				})}
			</ul>

			<button onClick={fetchData}>Get Data</button>
		</div>
	);
};
export default ReadFruit;
