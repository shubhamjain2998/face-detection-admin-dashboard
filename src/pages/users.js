import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Badge } from 'react-bootstrap';
import Heading from '../components/heading';
import * as actions from '../store/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Loader from '../components/loader';
import CustomForm from '../components/Forms/customForm';
// import axios from '../axios-faceDet';

const Users = () => {
	// const dispatch = useDispatch();

	const [users, setUsers] = useState(null);

	const storedUsers = useSelector((state) => state.user);
	const loading = useSelector((state) => state.user.loading);
	const dispatch = useDispatch();

	useEffect(() => {
		if (storedUsers.list) {
			setUsers(storedUsers.list);
		}
	}, [storedUsers.list]);

	let rightSidebarClasses = 'right-sidebar client-filter ';

	if (storedUsers.rightSidebar) {
		rightSidebarClasses = rightSidebarClasses.concat('show-right-sidebar');
	} else {
		rightSidebarClasses = rightSidebarClasses.concat('hide-right-sidebar');
	}

	const getRoles = (user) => {
		if (user.is_superuser) {
			return (
				<Badge variant='warning' className='user-badge'>
					Super Admin
				</Badge>
			);
		} else if (user.is_staff && !user.is_superuser) {
			return (
				<Badge variant='primary' className='user-badge'>
					Client
				</Badge>
			);
		} else {
			return (
				<Badge variant='success' className='user-badge'>
					Employee
				</Badge>
			);
		}
	};

	// const onDeleteHandler = (user) => {
	// 	// axios.delete('') TOBE DONE
	// };

	// const dropDown = (user) => (
	// 	<Dropdown>
	// 		<Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components' />
	// 		<Dropdown.Menu flip>
	// 			<Dropdown.Item>Edit</Dropdown.Item>
	// 			<Dropdown.Item
	// 				className='text-danger'
	// 				disabled={user.is_superuser}
	// 				onClick={() => onDeleteHandler(user)}
	// 			>
	// 				Delete
	// 			</Dropdown.Item>
	// 		</Dropdown.Menu>
	// 	</Dropdown>
	// );

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
		const filteredUsers = storedUsers.list.filter(
			(user) =>
				user.email.toLowerCase().includes(values.email.toLowerCase()) &&
				user.is_superuser === values.is_superuser
				// user.is_staff === values.is_staff
		);
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
								<div className='table-responsive userTable px-3'>
									<Table>
										<tbody className='dataTable'>
											<tr className='d-flex'>
												{/* <td>#</td> */}
												<td className='col-3'>User</td>
												<td className='col-3'>Role</td>
												<td className='col-3'>Joined</td>
												<td className='col-3'>Last Login</td>
											</tr>
											{users &&
												users.map((r, i) => (
													<tr key={r.id} className='d-flex'>
														{/* <td>{i + 1}</td> */}
														<td className='col-3' style={{ overflowWrap: 'anywhere' }}>
															{r.email}
														</td>
														<td className='col-3'>{getRoles(r)}</td>
														<td className='col-3'>
															{moment(r.date_joined).format(' h:mm a, DD MMM YYYY')}{' '}
														</td>
														<td className='col-3'>
															{r.last_login
																? moment(r.last_login).format(' h:mm a, DD MMM YYYY')
																: 'N/A'}{' '}
														</td>
													</tr>
												))}
										</tbody>
									</Table>
								</div>
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
