import React, { useState } from 'react';
import {
	Container,
	Row,
	Col,
	Image,
	FormControl,
	Form,
	Button,
} from 'react-bootstrap';
import john from '../../assets/avatar-02.jpg';
import {
	AiOutlineDashboard,
	AiOutlineUser,
	AiOutlineUserAdd,
	AiOutlineLogout,
	AiOutlineMenu,
} from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { NavLink, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Layout/sidebar';
import Backdrop from '../../components/Layout/backdrop';
import moment from 'moment';
import { RiSearch2Line, RiMenu3Line, RiMenu2Line } from 'react-icons/ri';

const Layout = (props) => {
	let routes = null;

	console.log(props.children);
	const location = useLocation();
	const [sidebar, setSidebar] = useState(false);

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

	const onToggleSidebar = () => {
		setSidebar(!sidebar);
	};

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
			<div className='layout-inner-div'>
				<Row style={{ minHeight: '100vh' }}>
					<Col sm={12} className='content'>
						<Sidebar show={sidebar} showSidebar={onToggleSidebar} />
						<Backdrop show={sidebar} showSidebar={onToggleSidebar} />
						<Col sm={12} xl={10} className='nav-bar'>
							<div className='nav-menu-icon' onClick={onToggleSidebar}>
								<RiMenu2Line size='1.5rem' />
							</div>
							<Form inline className='nav-form'>
								<FormControl
									type='text'
									placeholder='Search here'
									className='bg-transparent nav-search'
								></FormControl>
								<Button type='submit' variant='transparent'>
									<RiSearch2Line />
								</Button>
							</Form>
							<p>{moment().format('DD MMMM YYYY, dddd')}</p>
							<div className='nav-menu-icon'>
								<RiMenu3Line size='1.5rem' />
							</div>
						</Col>
						{props.children}
					</Col>
					{/* <Col sm={2} className='right-sidebar'></Col> */}
				</Row>
			</div>
		</div>
	);
};

export default Layout;
