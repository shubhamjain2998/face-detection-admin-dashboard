import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Heading from '../components/heading';
import * as actions from '../store/actions/index';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../components/loader';
import CustomForm from '../components/Forms/customForm';
import UserTable from '../components/userTable';

const Users = () => {
	const [users, setUsers] = useState(null);
	const [orgUsers, setOrgUsers] = useState(null);

	const storedUsers = useSelector((state) => state.user);
	const loading = useSelector((state) => state.user.loading);
	const accounts = useSelector((state) => state.acc.list);
	const dispatch = useDispatch();

	useEffect(() => {
		if (storedUsers.list && !users) {
			setUsers(storedUsers.list);
		}
		if (users && !storedUsers.user.is_superuser && !orgUsers) {
			const orgUser = [];
			for (let i in users) {
				if (accounts.filter((acc) => acc.emailId === users[i].email).length > 0) {
					orgUser.push(users[i]);
				}
			}
			setOrgUsers(orgUser);
		}
	}, [storedUsers.list, users, storedUsers.user, orgUsers, accounts]);

	let rightSidebarClasses = 'right-sidebar client-filter ';

	if (storedUsers.rightSidebar) {
		rightSidebarClasses = rightSidebarClasses.concat('show-right-sidebar');
	} else {
		rightSidebarClasses = rightSidebarClasses.concat('hide-right-sidebar');
	}

	const filterElements = [
		{
			name: 'email',
			type: 'text',
			label: 'User Email',
			value: '',
			col: 12,
		},
		{
			name: 'is_superuser',
			type: 'checkbox',
			value: false,
			label: 'Super Admin',
			col: 12,
		},
		{
			name: 'is_staff',
			type: 'checkbox',
			value: false,
			label: 'Client',
			col: 12,
		},
	];

	const onSubmitFilters = (values) => {
		const filteredUsers = storedUsers.list.filter((user) => {
			if (values.is_superuser === true && values.is_staff === false) {
				return (
					user.email.toLowerCase().includes(values.email.toLowerCase()) &&
					user.is_superuser
				);
			} else if (values.is_superuser === false && values.is_staff === true) {
				return (
					user.email.toLowerCase().includes(values.email.toLowerCase()) &&
					!user.is_superuser &&
					user.is_staff
				);
			} else if (values.is_superuser === true && values.is_staff === true) {
				return (
					user.email.toLowerCase().includes(values.email.toLowerCase()) &&
					user.is_staff
				);
			} else {
				return user.email.toLowerCase().includes(values.email.toLowerCase());
			}
		});
		if (storedUsers.rightSidebar) {
			dispatch(actions.toggleRightSidebar());
		}
		setUsers(filteredUsers);
	};

	return (
		<Container fluid>
			<Row className='position-relative'>
				<Col xl={10} md={12}>
					<Row>
						<Col lg={9}>
							<Heading name='Users' link='users' />
						</Col>
					</Row>

					{loading && <Loader loading={loading} />}

					{!loading && (
						<Row className='mt-3' style={{ overflow: 'auto' }}>
							<Col xs={12}>
								{users && storedUsers.user.is_superuser && <UserTable users={users} />}

								{users && !storedUsers.user.is_superuser && orgUsers && (
									<UserTable users={orgUsers} />
								)}
							</Col>
						</Row>
					)}
				</Col>
				<Col xl={2} md={12} className={rightSidebarClasses}>
					<p>filters</p>
					<div className='applied-filters'></div>

					<CustomForm
						filters
						elements={filterElements}
						handleSubmit={onSubmitFilters}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default Users;

//TODO: Add Pagination
