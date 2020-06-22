import React, { useState, useEffect } from 'react';
import Heading from '../components/heading';

import {
	Row,
	Col,
	Button,
	Form,
	Container,
	FormControl,
	Tab,
	Nav,
} from 'react-bootstrap';
import { BsPlus, BsGrid3X3Gap } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import CustomModal from '../components/modal';
import CustomTable from '../components/table';
import axios from '../axios-faceDet';
import AccountForm from '../components/Forms/accountForm';
import EmployeeCard from '../components/Cards/employeeCard';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions/index';
import Loader from '../components/loader';
import CustomForm from '../components/Forms/customForm';

const Employee = () => {
	const [show, setShow] = useState(false);
	const [activeOrg, setActiveOrg] = useState('All');
	const [selectedOrg, setSelectedOrg] = useState(null);
	const [loading, setLoading] = useState(false);

	const user = useSelector((state) => state.user.user);
	const rightSidebar = useSelector((state) => state.user.rightSidebar);
	const account = useSelector((state) => state.acc.details);
	const orgs = useSelector((state) => state.org.list);
	const storedEmps = useSelector((state) => state.acc.list);
	const dispatch = useDispatch();

	const [emps, setEmps] = useState(null);
	const [fetchedEmps, setFetchedEmps] = useState(false);

	const empTemplate = {
		pk: null,
		empId: '',
		emailId: '',
		username: '',
		firstName: '',
		lastName: '',
		gender: '',
		phone: '',
		readEmp: false,
		addEmp: false,
		readAtt: false,
		addAtt: false,
		readDept: false,
		addDept: false,
		idType: '',
		idProof: '',
		profileImg: '',
		orgId: '',
		deptId: '',
		role: '',
	};

	useEffect(() => {
		if (!fetchedEmps) {
			if (user.is_superuser) {
				if (activeOrg === 'All') {
					setLoading(true);
					axios
						.get('attendance/api/accounts')
						.then((res) => {
							// console.log(res.data);
							setEmps(res.data);
							setFetchedEmps(true);
							setLoading(false);
							dispatch(actions.setAccounts(res.data));
						})
						.catch((err) => {
							// console.log(err.response.data);
							setLoading(false);
						});
				} else {
					setLoading(true);
					axios
						.get('/attendance/api/accounts/filter?orgId=' + selectedOrg.pk)
						.then((res) => {
							// console.log(res.data);
							setEmps(res.data);
							setFetchedEmps(true);
							setLoading(false);
						})
						.catch((err) => {
							// console.log(err.response.data);
							setLoading(false);
						});
				}
			} else {
				setLoading(true);
				axios
					.get('/attendance/api/accounts/filter?orgId=' + account.orgId)
					.then((res) => {
						// console.log(res.data);
						setEmps(res.data);
						setFetchedEmps(true);
						setLoading(false);
						dispatch(actions.setAccounts(res.data));
					})
					.catch((err) => {
						// console.log(err.response.data);
						setLoading(false);
					});
			}
		}
	}, [fetchedEmps, user, account, activeOrg, selectedOrg, dispatch]);

	const onDeleteHandler = (id) => {
		axios
			.delete('/attendance/api/accounts/' + id + '/')
			.then((res) => {
				// console.log(res.data);
				setFetchedEmps(false);
			})
			.catch((err) => console.log(err.response.data));
	};

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const addingDone = (newEmployee) => {
		const temp = emps;
		temp.push(newEmployee);
		setEmps(temp);
		setShow(false);
	};

	const onChangeHandler = (event) => {
		event.preventDefault();
		console.log(event.target.value);
		const result = orgs.filter((org) => org.Name === event.target.value);
		setSelectedOrg(result[0]);
		setActiveOrg(event.target.value);
		setFetchedEmps(false);
	};

	let rightSidebarClasses = 'right-sidebar client-filter ';

	if (rightSidebar) {
		rightSidebarClasses = rightSidebarClasses.concat('show-right-sidebar');
	} else {
		rightSidebarClasses = rightSidebarClasses.concat('hide-right-sidebar');
	}

	const filterElements = [
		{
			name: 'name',
			type: 'text',
			label: 'Employee Name',
			value: '',
			col: 12,
		},
		{
			name: 'emailId',
			type: 'text',
			label: 'Email ID',
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
			name: 'gender',
			type: 'select',
			label: 'Gender',
			value: '',
			options: ['', 'Male', 'Female'],
			col: 12,
		},
	];

	const onSubmitFilters = (values) => {
		// console.log(values);
		// setFilters(values);
		if (storedEmps) {
			const filteredOrgs = storedEmps.filter((emp) => {
				return (
					(emp.firstName.toLowerCase().includes(values.name.toLowerCase()) ||
						emp.lastName.toLowerCase().includes(values.name.toLowerCase())) &&
					emp.emailId.toLowerCase().includes(values.emailId.toLowerCase()) &&
					emp.phone.includes(values.phone.toString()) &&
					emp.gender.includes(values.gender)
				);
			});
			if (rightSidebar) {
				dispatch(actions.toggleRightSidebar());
			}
			setEmps(filteredOrgs);
		}
	};

	return (
		<Container fluid>
			<Row className='position-relative'>
				<Col xl={10} md={12}>
					<Row>
						<Col lg={9}>
							<Heading name='Employees' link='employee' />
						</Col>
						<Col lg={3} className='d-flex justify-content-center align-items-center'>
							<Button
								variant='primary'
								className='px-2'
								onClick={handleShow}
								disabled={activeOrg === 'All' && user.is_superuser}
							>
								<span className='pr-1'>
									<BsPlus />
								</span>
								Add Employee
							</Button>
						</Col>
					</Row>

					{user.is_superuser && (
						<Row className='my-2'>
							<Col md={6}>
								<Form.Row>
									<p className='text-primary mb-1 pl-3'>Select Organization</p>
								</Form.Row>
								<Form.Row>
									<Col sm={10} xs={8}>
										<FormControl
											as='select'
											name='selectedOrg'
											onChange={onChangeHandler}
										>
											<option>All</option>
											{orgs.map((e) => (
												<option key={e.pk}>{e.Name}</option>
											))}
										</FormControl>
									</Col>
									{/* <Col sm={2} xs={4}>
										<Button>Submit</Button>
									</Col> */}
								</Form.Row>
							</Col>
						</Row>
					)}

					<Tab.Container defaultActiveKey='card'>
						<Row className='client-tabs'>
							<Nav>
								<Nav.Item>
									<Nav.Link eventKey='card'>
										<span className='px-2 makeLink'>
											<BsGrid3X3Gap />
										</span>
										<span>Segment</span>
									</Nav.Link>
								</Nav.Item>

								<Nav.Item>
									<Nav.Link eventKey='table'>
										<span className='px-2 makeLink'>
											<FaBars />
										</span>
										<span>ListView</span>
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Row>
						<Row>
							<Col sm={12}>
								<Tab.Content>
									<Tab.Pane eventKey='card'>
										{loading && <Loader loading={loading} />}
										<Row>
											{!loading &&
												emps &&
												emps.map((emp, i) => (
													<Col key={emp.empId} xs={6} md={4} xl={3} className='my-3'>
														<EmployeeCard
															employee={emp}
															onDelete={onDeleteHandler}
														></EmployeeCard>
													</Col>
												))}
										</Row>
									</Tab.Pane>
									<Tab.Pane eventKey='table'>
										{!loading && emps && <CustomTable values={emps} type='emp' />}
									</Tab.Pane>
								</Tab.Content>
							</Col>
						</Row>
					</Tab.Container>
					<CustomModal show={show} onClose={handleClose} heading='Add Employee'>
						<AccountForm
							org={selectedOrg}
							add
							values={empTemplate}
							onEditingDone={addingDone}
						/>
					</CustomModal>
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

export default Employee;
