import useAdminCheck from '../../../hooks/useAdminCheck';

const AdminPanel = () => {
	const isAdmin = useAdminCheck();

	return (
		<div>
			<h2>Панель администратора</h2>
			{isAdmin === null ? <p>Загрузка...</p> : <p>✅ Вы администратор</p>}
		</div>
	);
};

export default AdminPanel;
