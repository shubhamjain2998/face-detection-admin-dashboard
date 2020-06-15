import React, { useState, useEffect } from 'react';
import Heading from '../components/heading';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CustomTable from '../components/table';
import { useSelector, useDispatch } from 'react-redux';
import { BsPlus } from 'react-icons/bs';
import CustomModal from '../components/modal';
import DepartmentForm from '../components/Forms/deptForm';
import DeleteModal from '../components/deleteModal';
import * as actions from '../store/actions/index';
import axios from '../axios-faceDet';
import CustomForm from '../components/Forms/customForm';

const Department = () => {
	const [show, setShow] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [activeDept, setActiveDept] = useState(null);
	const [mode, setMode] = useState('add');
	const [department, setDepartment] = useState(null);
	const dispatch = useDispatch();

	const handleClose = () => setShow(false);
	const handleCloseDelete = () => setShowDelete(false);

	const storedDepartment = useSelector((state) => state.acc.department);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		if (storedDepartment) {
			setDepartment(storedDepartment);
		}
	}, [storedDepartment]);

	const tableElements = ['Department Name', 'Description'];

	const filterElements = [
		{
			name: 'DeptName',
			type: 'text',
			label: 'Department Name',
			value: '',
			col: 12,
		},
		{
			name: 'Description',
			type: 'text',
			label: 'Description',
			value: '',
			col: 12,
		},
	];

	const DepartmentReload = () => {
		setShow(false);
		dispatch(actions.fetchDept());
	};

	const onAddHandler = () => {
		setActiveDept(null);
		setMode('add');
		setShow(true);
	};

	const onEditHandler = (dept) => {
		setActiveDept(dept);
		setMode('edit');
		setShow(true);
	};

	const onDeleteHandlerTable = (dept) => {
		setActiveDept(dept);
		setShowDelete(true);
	};

	const onDeleteHandler = () => {
		axios.delete('/attendance/api/dept/' + activeDept.id + '/').then(() => {
			setShowDelete(false);
			DepartmentReload();
		});
	};

	const onSubmitFilters = (values) => {
		const filteredDept = storedDepartment.filter(
			(dept) =>
				dept.DeptName.toLowerCase().includes(values.DeptName.toLowerCase()) &&
				dept.Description.toLowerCase().includes(values.Description.toLowerCase())
		);
		if (user.rightSidebar) {
			dispatch(actions.toggleRightSidebar());
		}
		setDepartment(filteredDept);
	};

	let rightSidebarClasses = 'right-sidebar client-filter ';

	if (user.rightSidebar) {
		rightSidebarClasses = rightSidebarClasses.concat('show-right-sidebar');
	} else {
		rightSidebarClasses = rightSidebarClasses.concat('hide-right-sidebar');
	}

	return (
		<Container fluid>
			<Row>
				<Col xl={10} md={12}>
					<Row>
						<Col lg={9}>
							<Heading name='Department' link='department' />
						</Col>
						<Col lg={3} className='d-flex justify-content-center align-items-center'>
							<Button variant='primary' className='px-2' onClick={onAddHandler}>
								<span className='pr-1'>
									<BsPlus />
								</span>
								Add Department
							</Button>
						</Col>
					</Row>

					<Row className='mt-3'>
						<Col xs={12}>
							{department && (
								<CustomTable
									values={department}
									elements={tableElements}
									type='dept'
									onEdit={onEditHandler}
									onDelete={onDeleteHandlerTable}
								/>
							)}
						</Col>
					</Row>

					<CustomModal show={show} onClose={handleClose} heading='Add Department'>
						<DepartmentForm
							mode={mode}
							dept={activeDept}
							onEditingDone={DepartmentReload}
						/>
					</CustomModal>
					<DeleteModal
						show={showDelete}
						handleClose={handleCloseDelete}
						onDeleteHandler={onDeleteHandler}
					/>
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

export default Department;
