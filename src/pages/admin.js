import React, { useState } from 'react';
import DashboardNavbar from '../components/navbar';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Backdrop from '../components/backdrop';

const Admin = (props) => {
	const location = useLocation();
	const [sidebar, setSidebar] = useState(false);

	if (location.pathname === '/login' || location.pathname === '/register') {
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
