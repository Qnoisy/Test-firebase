import { FC } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Profile from './components/auth/Profile';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ReadFruit from './components/fruitbase/ReadFruit';
import UpdateFruit from './components/fruitbase/UpdateFruit';
import UpdateWriteFruit from './components/fruitbase/UpdateWriteFruit';
import WriteFruit from './components/fruitbase/WriteFruit';
import ReadImage from './components/imagebase/ReadImage';
import UpdateImage from './components/imagebase/UpdateImage';
import UpdateWriteImage from './components/imagebase/UpdateWirteImage';
import WriteImage from './components/imagebase/WriteImage';
import Main from './components/Main';

interface RouteInterface {
	path: string;
	component: FC;
}

const publicRoutes: RouteInterface[] = [
	{ path: '*', component: Main },
	{ path: '/signIn', component: SignIn },
	{ path: '/signUp', component: SignUp },
	{ path: '/profile', component: Profile },
	{ path: '/writeFruit', component: WriteFruit },
	{ path: '/readFruit', component: ReadFruit },
	{ path: '/updateFruit', component: UpdateFruit },
	{ path: '/writeImage', component: WriteImage },
	{ path: '/readImage', component: ReadImage },
	{ path: '/updateImage', component: UpdateImage },
];

function App() {
	const navigate = useNavigate();
	return (
		<div>
			<ul className='app__list'>
				{publicRoutes.map((route, index) => (
					<button
						key={index}
						className='app__link'
						onClick={() => navigate(route.path)}
					>
						<span className='app__link--text'>{route.component.name}</span>
					</button>
				))}
			</ul>

			<Routes>
				{publicRoutes.map((route, index) => (
					<Route key={index} path={route.path} element={<route.component />} />
				))}
				<Route path='/updateWriteFruit/:id' element={<UpdateWriteFruit />} />
				<Route path='/updateWriteImage/:id' element={<UpdateWriteImage />} />
			</Routes>
		</div>
	);
}

export default App;
