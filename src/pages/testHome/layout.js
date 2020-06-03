import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './layout.scss';
import john from '../../assets/avatar-02.jpg';
import {
	AiOutlineDashboard,
	AiOutlineUser,
	AiOutlineUserAdd,
	AiOutlineLogout,
} from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { NavLink, useLocation } from 'react-router-dom';

const Layout = (props) => {
	let routes = null;

	console.log(props.children);
	const location = useLocation();


	routes = [
		{ name: 'Dashboard', link: '/home', icon: <AiOutlineDashboard /> },
		{ name: 'Clients', link: '/client', icon: <BsFillPeopleFill /> },
		{ name: 'Employees', link: '/employee', icon: <AiOutlineUser /> },
		{ name: 'Users', link: '/user', icon: <AiOutlineUserAdd /> },
		{ name: 'Department', link: '/dept', icon: <AiOutlineDashboard /> },
		{
			name: 'Attendance',
			dropdown: [
				{ name: 'admin', link: '/attAdmin' },
				{ name: 'employee', link: '/home' },
			],
		},
	];


	if (
		location.pathname === '/login' ||
		location.pathname === '/register' ||
		location.pathname === '/org' ||
		location.pathname === '/account' ||
		location.pathname === '/logout' ||
		location.pathname === '/'
	) {
		return <>{props.children}</>;
	}


	return (
		<div className='layout-outer-div'>
			<div className='layout-sidebar'>
				<div className='profile'>
					<div className='profile-image'>
						<Image fluid src={john} alt='' rounded />
					</div>
					<p>Admin</p>
				</div>

				{routes.map((route) => {
					if (route.link) {
						return (
							<NavLink to={route.link} activeClassName='active-link' className='link'>
								<div className='route'>
									{route.icon}
									<p>{route.name}</p>
								</div>
							</NavLink>
						);
					} else return '';
				})}
				<NavLink to='/logout' activeClassName='active-link' className='link logout'>
					<div className='route'>
						<AiOutlineLogout />
						<p>Logout</p>
					</div>
				</NavLink>
			</div>
			<Container fluid className='layout-inner-div'>
				<Row style={{ minHeight: '100vh' }}>
					<Col sm={12} className='content'>
						{props.children}
					</Col>
					{/* <Col sm={2} className='right-sidebar'></Col> */}
				</Row>
			</Container>
		</div>
	);
};

export default Layout;
