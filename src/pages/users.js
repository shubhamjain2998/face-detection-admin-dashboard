import React from 'react';
import { Container, Row, Col, Table, Badge } from 'react-bootstrap';
import Heading from '../components/heading';
// import * as actions from '../store/actions/index';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Loader from '../components/loader';
// import CustomForm from '../components/Forms/customForm';
// import CustomToggle from '../components/customToggle';
// import axios from '../axios-faceDet';

const Users = () => {
	// const dispatch = useDispatch();
	const users = useSelector((state) => state.user);
	const loading = useSelector((state) => state.user.loading);

	// useEffect(() => {
	// 	if (users.list.length === 0) {
	// 		dispatch(actions.fetchUsers());
	// 	}
	// }, [users, dispatch]);

	let rightSidebarClasses = 'right-sidebar client-filter ';

	if (users.rightSidebar) {
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
			name: 'name',
			type: 'text',
			label: 'Organization Name',
			value: '',
			col: 12,
		},
		{
			name: 'orgType',
			type: 'text',
			label: 'Organization Type',
			value: '',
			col: 12,
		},
		{
			name: 'phone',
			type: 'number',
			label: 'Contact Number',
			value: '',
			col: 12,
		},
		{
			name: 'staffCount',
			type: 'text',
			label: 'Total Staff',
			value: '',
			col: 12,
		},
	];

	const onSubmitFilters = (values) => {
		console.log(values);
		// setFilters(values);
		// if (storedOrgs) {
		// 	const filteredOrgs = storedOrgs.filter((org) => {
		// 		return (
		// 			org.Name.toLowerCase().includes(values.name.toLowerCase()) &&
		// 			org.orgType.toLowerCase().includes(values.orgType.toLowerCase()) &&
		// 			org.contact.includes(values.phone.toString()) &&
		// 			parseInt(org.staffcount) >= values.staffCount
		// 		);
		// 	});
		// 	setOrgs(filteredOrgs);
		// }
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
												<td className='col-4'>Active Users</td>
												<td className='col-2'>Role</td>
												<td className='col-3'>Date Joined</td>
												<td className='col-3'>Last Login</td>
											</tr>
											{users.list.map((r, i) => (
												<tr key={r.id} className='d-flex'>
													{/* <td>{i + 1}</td> */}
													<td className='col-4' style={{ overflowWrap: 'anywhere' }}>
														{r.email}
													</td>
													<td className='col-2'>{getRoles(r)}</td>
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

					{/* <CustomForm
						filters
						elements={filterElements}
						handleSubmit={onSubmitFilters}
					/> */}
				</Col>
			</Row>
		</Container>
	);
};

export default Users;

//TODO: Add Pagination
//TODO: Add Filters
