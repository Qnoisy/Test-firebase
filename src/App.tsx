import { FC } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

interface RouteInterface {
	path: string;
	component: FC;
}

const publicRoutes: RouteInterface[] = [
	{ path: '/', component: Profile },
	{ path: '/signIn', component: SignIn },
	{ path: '/profile', component: Profile },
	{ path: '/signUp', component: SignUp },
];

function App() {
	return (
		<div>
			<ul className='app__list'>
				{publicRoutes.map((route, index) => (
					<li key={index} className='app__link'>
						<Link className='app__link--text' to={route.path}>
							{route.component.name}
						</Link>
					</li>
				))}
			</ul>

			<Routes>
				{publicRoutes.map((route, index) => (
					<Route key={index} path={route.path} element={<route.component />} />
				))}
			</Routes>
		</div>
	);
}

export default App;
