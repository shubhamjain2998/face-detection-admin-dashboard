import React, { useState } from 'react';
import { Row, Col, Image, FormControl, Form, Button } from 'react-bootstrap';
import john from '../../assets/avatar-02.jpg';
import user_default from '../../assets/user.svg';
import {
	AiOutlineDashboard,
	AiOutlineUser,
	AiOutlineUserAdd,
	AiOutlineLogout,
	AiOutlineProfile,
} from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { NavLink, useLocation, Link } from 'react-router-dom';
import Sidebar from '../../components/Layout/sidebar';
import Backdrop from '../../components/Layout/backdrop';
import moment from 'moment';
import { RiSearch2Line, RiMenu3Line, RiMenu2Line } from 'react-icons/ri';
import * as actions from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';

const Layout = (props) => {
	let routes = null;
	// console.log(props.children);
	const location = useLocation();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const acc = useSelector((state) => state.acc);
	const org = useSelector((state) => state.org);
	const [sidebar, setSidebar] = useState(false);

	if (user.user.is_superuser) {
		routes = [
			{ name: 'Dashboard', link: '/home', icon: <AiOutlineDashboard /> },
			{ name: 'Clients', link: '/client', icon: <BsFillPeopleFill /> },
			{ name: 'Employees', link: '/employee', icon: <AiOutlineUser /> },
			{ name: 'Users', link: '/user', icon: <AiOutlineUserAdd /> },
			{ name: 'Department', link: '/dept' },
			{ name: 'Attendance admin', link: '/attAdmin' },
			// { name: 'Attendance employee', link: '/home' },
		];
	} else {
		routes = [
			{ name: 'Dashboard', link: '/home', icon: <AiOutlineDashboard /> },
			{ name: 'Employees', link: '/employee', icon: <AiOutlineUser /> },
			{ name: 'Department', link: '/dept' },
			{ name: 'Attendance', link: '/attAdmin' },
			{ name: 'My Profile', link: '/attAdmin', icon: <AiOutlineProfile /> },
		];
	}

	if (location.pathname === '/logout' || location.pathname === '/') {
		return <>{props.children}</>;
	}

	const onToggleSidebar = () => {
		setSidebar(!sidebar);
	};
	const onToggleRightSidebar = () => {
		dispatch(actions.toggleRightSidebar());
	};

	return (
		<div className='layout-outer-div'>
			<div className='layout-sidebar'>
				<div className='profile'>
					<div className='profile-image'>
						<Image
							fluid
							src={
								user.user.is_superuser
									? john
									: acc.details.profileImg
									? acc.details.profileImg
									: user_default
							}
							alt=''
							rounded
						/>
					</div>

					{user.user.is_superuser ? (
						<p style={{ textAlign: 'center' }}>@Admin</p>
					) : (
						<p style={{ textAlign: 'center' }}>@{acc.details.username}</p>
					)}
				</div>

				{routes.map((route, i) => {
					if (route.link) {
						if (route.name === 'My Profile') {
							return (
								<NavLink
									key={route.name + i}
									to={{
										pathname: '/profile',
										state: { acc: acc.details, org: org.details },
									}}
								>
									<div className='route'>
										{route.icon}
										<p>{route.name}</p>
										<span className='upper-curve'></span>
										<span className='lower-curve'></span>
									</div>
								</NavLink>
							);
						}
						return (
							<NavLink
								key={route.name + i}
								to={route.link}
								activeClassName='active-link'
								className='link'
							>
								<div className='route'>
									{route.icon}
									<p>{route.name}</p>
									<span className='upper-curve'></span>
									<span className='lower-curve'></span>
								</div>
							</NavLink>
						);
					}
					return '';
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
						<Backdrop show={user.rightSidebar} showSidebar={onToggleRightSidebar} />
						<Col sm={12} lg={10} className='nav-bar'>
							<div
								className={sidebar ? 'nav-menu-icon light' : 'nav-menu-icon dark'}
								onClick={onToggleSidebar}
							>
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
							<div className='nav-sidebar-icon' onClick={onToggleRightSidebar}>
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
