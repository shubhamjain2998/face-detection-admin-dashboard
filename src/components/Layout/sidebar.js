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
import { useSelector } from 'react-redux';

const Sidebar = (props) => {
	let attachedClass = ['sidebar', 'sidebarOpen'];
	const user = useSelector((state) => state.user.user);

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
			{ name: 'Department', link: '/dept' },

			{ name: 'Users', link: '/home', icon: <AiOutlineUserAdd /> },
		];
	} else {
		routes = [
			{ name: 'Dashboard', link: '/home', icon: <AiOutlineDashboard /> },
			{ name: 'Employees', link: '/employee', icon: <AiOutlineUser /> },
			{ name: 'Department', link: '/dept' },
			{ name: 'Users', link: '/home', icon: <AiOutlineUserAdd /> },
		];
	}

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
