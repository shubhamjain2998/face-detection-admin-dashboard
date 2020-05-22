import React from 'react';
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
	if (!props.show) {
		attachedClass = ['sidebar', 'sidebarClose'];
		return <div className={attachedClass.join(' ')}></div>;
	}

	return (
		<div className={attachedClass.join(' ')}>
			<ListGroup variant='flush'>
				<NavLink to='/' onClick={props.showSidebar}>
					<ListGroup.Item>
						<AiOutlineDashboard /> Dashboard
					</ListGroup.Item>
				</NavLink>
				<NavLink
					to='/client'
					activeClassName='linkActive'
					onClick={props.showSidebar}
				>
					<ListGroup.Item>
						<BsFillPeopleFill />
						Clients
					</ListGroup.Item>
				</NavLink>
				<ListGroup.Item>
					<AiOutlineUser />
					Employees
				</ListGroup.Item>
				<ListGroup.Item>Department</ListGroup.Item>
				<ListGroup.Item>
					<AiOutlineKey />
					Authentication
				</ListGroup.Item>
				<ListGroup.Item>
					<AiOutlineUserAdd />
					Users
				</ListGroup.Item>
			</ListGroup>
		</div>
	);
};

export default Sidebar;
