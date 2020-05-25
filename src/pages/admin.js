import React, { useState } from 'react';
import DashboardNavbar from '../components/Layout/navbar';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Layout/sidebar';
import Backdrop from '../components/Layout/backdrop';

const Admin = (props) => {
	const location = useLocation();
	const [sidebar, setSidebar] = useState(false);

	if (
		location.pathname === '/login' ||
		location.pathname === '/register' ||
		location.pathname === '/org' ||
		location.pathname === '/account' ||
		location.pathname === '/logout'
	) {
		return <>{props.children}</>;
	}

	const onToggleSidebar = () => {
		setSidebar(!sidebar);
	};

	return (
		<>
			<DashboardNavbar showSidebar={onToggleSidebar} />
			<div className='admin-layout'>
				<Sidebar show={sidebar} showSidebar={onToggleSidebar} />
				<Backdrop show={sidebar} showSidebar={onToggleSidebar} />
				<div className='admin-content'>{props.children}</div>
			</div>
		</>
	);
};

export default Admin;
