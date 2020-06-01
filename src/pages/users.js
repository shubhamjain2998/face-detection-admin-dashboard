import React, { useEffect } from 'react';
import { Container, Row, Col, Table, Badge } from 'react-bootstrap';
import Heading from '../components/heading';
import * as actions from '../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Loader from '../components/loader';
// import CustomToggle from '../components/customToggle';
// import axios from '../axios-faceDet';

const Users = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.user);
	const loading = useSelector((state) => state.user.loading);

	useEffect(() => {
		if (users.list.length === 0) {
			dispatch(actions.fetchUsers());
		}
	}, [users, dispatch]);

	const getRoles = (user) => {
		if (user.is_superuser) {
			return <Badge variant='warning'>Super Admin</Badge>;
		} else if (user.is_staff && !user.is_superuser) {
			return <Badge variant='primary'>Client</Badge>;
		} else {
			return <Badge variant='success'>Employee</Badge>;
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

	return (
		<Container fluid>
			<Row>
				<Col lg={9}>
					<Heading name='Users' link='users' />
				</Col>
			</Row>

			{loading && <Loader loading={loading} />}

			{!loading && (
				<Row className='mt-3'>
					<Col md={{ span: 10, offset: 1 }} xs={12}>
						<div className='table-responsive userTable'>
							<Table striped>
								<thead>
									<tr>
										<th>#</th>
										<th>Active Users</th>
										<th>Role</th>
										<th>Date Joined</th>
										<th>Last Login</th>
									</tr>
								</thead>
								<tbody>
									{users.list.map((r, i) => (
										<tr key={r.id}>
											<td>{i + 1}</td>
											<td style={{ overflowWrap: 'anywhere' }}>{r.email}</td>
											<td>{getRoles(r)}</td>
											<td>{moment(r.date_joined).format(' h:mm a, DD MMM YYYY')} </td>
											<td>
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
		</Container>
	);
};

export default Users;

//TODO: Add Pagination
//TODO: Add Filters
