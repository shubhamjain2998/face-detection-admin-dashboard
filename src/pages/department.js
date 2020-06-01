import React, { useState } from 'react';
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

const Department = () => {
	const [show, setShow] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [activeDept, setActiveDept] = useState(null);
	const [mode, setMode] = useState('add');
	const dispatch = useDispatch();

	const handleClose = () => setShow(false);
	const handleCloseDelete = () => setShowDelete(false);

	const department = useSelector((state) => state.acc.department);

	const tableElements = ['Department Name', 'Description'];

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

	return (
		<Container fluid>
			<Row>
				<Col lg={9}>
					<Heading name='Department' link='department' />
				</Col>
				<Col lg={3} className='d-flex justify-content-center align-items-center'>
					<Button variant='warning' className='px-2' onClick={onAddHandler}>
						<span className='pr-1'>
							<BsPlus />
						</span>
						Add Department
					</Button>
				</Col>
			</Row>

			<Row className='mt-3'>
				<Col md={{ span: 10, offset: 1 }} xs={12}>
					<CustomTable
						values={department}
						elements={tableElements}
						type='dept'
						onEdit={onEditHandler}
						onDelete={onDeleteHandlerTable}
					/>
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
		</Container>
	);
};

export default Department;
