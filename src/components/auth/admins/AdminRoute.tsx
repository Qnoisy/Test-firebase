import { Navigate, Outlet } from 'react-router-dom';
import useAdminCheck from '../../../hooks/useAdminCheck';

const AdminRoute = () => {
	const isAdmin = useAdminCheck();

	if (isAdmin === null) return <p>Загрузка...</p>;
	return isAdmin ? <Outlet /> : <Navigate to='/' replace />;
};

export default AdminRoute;
