import React, { useState, useEffect } from 'react';
import Heading from '../components/heading';

import {
	Row,
	Col,
	Button,
	Form,
	Container,
	FormControl,
} from 'react-bootstrap';
import { BsPlus, BsGrid3X3Gap } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import CustomModal from '../components/modal';
import CustomTable from '../components/table';
import axios from '../axios-faceDet';
import AccountForm from '../components/Forms/accountForm';
import EmployeeCard from '../components/Cards/employeeCard';
import { useSelector } from 'react-redux';

const Employee = () => {
	const [show, setShow] = useState(false);
	const [showCard, setShowCard] = useState(true);
	const [activeOrg, setActiveOrg] = useState('All');
	const [selectedOrg, setSelectedOrg] = useState(null);

	const user = useSelector((state) => state.user.user);
	const account = useSelector((state) => state.acc.details);
	const orgs = useSelector((state) => state.org.list);

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
					axios
						.get('attendance/api/accounts')
						.then((res) => {
							console.log(res.data);
							setEmps(res.data);
							setFetchedEmps(true);
						})
						.catch((err) => console.log(err));
				} else {
					axios
						.get('/attendance/api/accounts/filter?orgId=' + selectedOrg.pk)
						.then((res) => {
							console.log(res.data);
							setEmps(res.data);
							setFetchedEmps(true);
						})
						.catch((err) => console.log(err));
				}
			} else {
				axios
					.get('/attendance/api/accounts/filter?orgId=' + account.orgId)
					.then((res) => {
						console.log(res.data);
						setEmps(res.data);
						setFetchedEmps(true);
					})
					.catch((err) => console.log(err));
			}
		}
	}, [fetchedEmps, user, account, activeOrg, selectedOrg]);

	const onDeleteHandler = (id) => {
		axios
			.delete('/attendance/api/org/' + id + '/')
			.then((res) => {
				console.log(res.data);
				setFetchedEmps(false);
			})
			.catch((err) => console.log(err));
	};

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const onShowCards = () => setShowCard(true);
	const onShowTable = () => setShowCard(false);

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

	return (
		<Container fluid>
			<Row>
				<Col lg={9}>
					<Heading name='Employees' link='employee' />
				</Col>
				<Col lg={3} className='d-flex justify-content-center align-items-center'>
					<span className='px-2 makeLink' onClick={onShowCards}>
						<BsGrid3X3Gap />
					</span>
					<span className='px-2 makeLink' onClick={onShowTable}>
						<FaBars />
					</span>
					<Button
						variant='warning'
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
							<p className='text-info mb-1 pl-3'>Select Organization</p>
						</Form.Row>
						<Form.Row>
							<Col sm={10} xs={8}>
								<FormControl as='select' name='selectedOrg' onChange={onChangeHandler}>
									<option>All</option>
									{orgs.map((e) => (
										<option key={e.pk}>{e.Name}</option>
									))}
								</FormControl>
							</Col>
							<Col sm={2} xs={4}>
								<Button>Submit</Button>
							</Col>
						</Form.Row>
					</Col>
				</Row>
			)}

			<Form>
				<Form.Row>
					<Col className='my-2' xs={12} sm={6} md={3}>
						<Form.Control type='text' placeholder='Employee ID'></Form.Control>
					</Col>
					<Col className='my-2' xs={12} sm={6} md={3}>
						<Form.Control type='text' placeholder='Employee Name'></Form.Control>
					</Col>
					<Col className='my-2' xs={12} sm={6} md={3}>
						<Form.Control type='text' placeholder='Company'></Form.Control>
					</Col>
					<Col className='my-2' xs={12} sm={6} md={3}>
						<Button variant='success' block type='submit'>
							Search
						</Button>
					</Col>
				</Form.Row>
			</Form>

			{showCard && emps && (
				<Row>
					{emps.map((emp, i) => (
						<Col key={emp.empId} xs={12} sm={6} md={4} lg={3} className='my-3'>
							<EmployeeCard employee={emp} onDelete={onDeleteHandler}></EmployeeCard>
						</Col>
					))}
				</Row>
			)}

			{!showCard && (
				<Row className='mt-3'>
					<Col md={{ span: 10, offset: 1 }} xs={12}>
						<CustomTable values={emps} type='emp' />
					</Col>
				</Row>
			)}

			<CustomModal show={show} onClose={handleClose} heading='Add Employee'>
				<AccountForm
					org={selectedOrg}
					add
					values={empTemplate}
					onEditingDone={addingDone}
				/>
			</CustomModal>
		</Container>
	);
};

export default Employee;
