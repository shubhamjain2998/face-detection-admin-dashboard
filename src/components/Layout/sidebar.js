import React, { useState, Fragment } from 'react';
import { ListGroup, Image } from 'react-bootstrap';
import {
	AiOutlineDashboard,
	AiOutlineUser,
	AiOutlineUserAdd,
	AiOutlineLogout,
} from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import john from '../../assets/avatar-02.jpg';
import user_default from '../../assets/user.svg';

const Sidebar = (props) => {
	let attachedClass = ['sidebar', 'sidebarOpen'];
	const user = useSelector((state) => state.user.user);
	const acc = useSelector((state) => state.acc);
	const org = useSelector((state) => state.org);

	const [authDropdown, setAuthDropdown] = useState(false);

	const authDropdownHandler = () => setAuthDropdown(!authDropdown);

	if (!props.show) {
		attachedClass = ['sidebar', 'sidebarClose'];
		return <div className={attachedClass.join(' ')}></div>;
	}

	let routes;

	if (user.is_superuser) {
		routes = [
			{ name: 'Dashboard', link: '/home', icon: <AiOutlineDashboard /> },
			{ name: 'Clients', link: '/client', icon: <BsFillPeopleFill /> },
			{ name: 'Employees', link: '/employee', icon: <AiOutlineUser /> },
			{ name: 'Users', link: '/user', icon: <AiOutlineUserAdd /> },
			{ name: 'Department', link: '/dept' },
			{ name: 'Attendance admin', link: '/attAdmin' },
			{ name: 'Attendance employee', link: '/home' },
			{ name: 'Logout', link: '/logout', icon: <AiOutlineLogout /> },
		];
	} else {
		routes = [
			{ name: 'Dashboard', link: '/home', icon: <AiOutlineDashboard /> },
			{ name: 'Employees', link: '/employee', icon: <AiOutlineUser /> },
			{ name: 'Department', link: '/dept' },
			{ name: 'Attendance', link: '/attAdmin' },
			{ name: 'Logout', link: '/logout', icon: <AiOutlineLogout /> },
		];
	}
	return (
		<div className={attachedClass.join(' ')}>
			<ListGroup variant='flush'>
				<ListGroup.Item>
					<div className='profile'>
						<div className='profile-image'>
							<Image
								fluid
								src={
									user.is_superuser
										? john
										: acc.details.profileImg
										? acc.details.profileImg
										: user_default
								}
								alt=''
								rounded
							/>
						</div>

						{user.is_superuser ? (
							'@Admin'
						) : (
							<Link
								to={{
									pathname: '/profile',
									state: { acc: acc.details, org: org.details },
								}}
							>
								<p style={{ textAlign: 'center' }}>@{acc.details.username}</p>
							</Link>
						)}
					</div>
				</ListGroup.Item>
				{routes.map((route, i) => {
					if (!route.link) {
						const dropDownItems = route.dropdown.map((route, i) => (
							<NavLink
								key={route.name + i}
								to={route.link}
								activeClassName='active-link'
								className='link'
							>
								<ListGroup.Item className='sidebar-dropdown-item'>
									{route.icon ? route.icon : ''}
									{route.name}
								</ListGroup.Item>
							</NavLink>
						));

						return (
							<Fragment key={route.name + i}>
								<ListGroup.Item onClick={authDropdownHandler}>
									{route.icon ? route.icon : ''}
									{route.name}
								</ListGroup.Item>

								{authDropdown ? <div className='dropdown'>{dropDownItems}</div> : ''}
							</Fragment>
						);
					}
					return (
						<NavLink
							key={route.name + i}
							to={route.link}
							activeClassName='active-link'
							className='link'
						>
							<ListGroup.Item onClick={props.showSidebar}>
								{route.icon ? route.icon : ''}
								{route.name}
							</ListGroup.Item>
						</NavLink>
					);
				})}
			</ListGroup>
		</div>
	);
};

export default Sidebar;
