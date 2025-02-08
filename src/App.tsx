import { FC } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Main from './components/main';

interface RouteInterface {
	path: string;
	component: FC;
}

const publicRoutes: RouteInterface[] = [
	{ path: '/', component: Main },
	{ path: '/signIn', component: SignIn },
	{ path: '/signUp', component: SignUp },
	{ path: '/profile', component: Profile },
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
				<Route path='*' element={<Main />} />
			</Routes>
		</div>
	);
}

export default App;
