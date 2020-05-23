import React, { useState, Fragment } from 'react';
import { ListGroup } from 'react-bootstrap';
import {
	AiOutlineDashboard,
	AiOutlineUser,
	AiOutlineKey,
	AiOutlineUserAdd,
} from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {
	let attachedClass = ['sidebar', 'sidebarOpen'];

	const [authDropdown, setAuthDropdown] = useState(false);

	const authDropdownHandler = () => setAuthDropdown(!authDropdown);

	if (!props.show) {
		attachedClass = ['sidebar', 'sidebarClose'];
		return <div className={attachedClass.join(' ')}></div>;
	}

	const routes = [
		{ name: 'Dashboard', link: '/', icon: <AiOutlineDashboard /> },
		{ name: 'Clients', link: '/client', icon: <BsFillPeopleFill /> },
		{ name: 'Employees', link: '/employee', icon: <AiOutlineUser /> },
		{ name: 'Department', link: '/' },
		{
			name: 'Authentication',
			icon: <AiOutlineKey />,
			dropdown: [
				{ name: 'Login', link: '/login' },
				{ name: 'Register', link: '/register' },
				{ name: 'Forgot Password', link: '/' },
				{ name: 'OTP', link: '/' },
			],
		},
		{ name: 'Users', link: '/', icon: <AiOutlineUserAdd /> },
	];

	return (
		<div className={attachedClass.join(' ')}>
			<ListGroup variant='flush'>
				{routes.map((route, i) => {
					if (!route.link) {
						const dropDownItems = route.dropdown.map((route, i) => (
							<NavLink key={route.name + i} to={route.link}>
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
						<NavLink key={route.name + i} to={route.link}>
							<ListGroup.Item>
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
