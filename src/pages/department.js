import React, { useState } from 'react';
import Heading from '../components/heading';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CustomTable from '../components/table';
import { useSelector } from 'react-redux';
import { BsPlus } from 'react-icons/bs';
import CustomModal from '../components/modal';
import DepartmentForm from '../components/Forms/deptForm';

const Department = () => {
	const [show, setShow] = useState(false);

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const department = useSelector((state) => state.acc.department);

	const tableElements = ['Department Name', 'Description'];

	return (
		<Container fluid>
			<Row>
				<Col lg={9}>
					<Heading name='Department' link='department' />
				</Col>
				<Col lg={3} className='d-flex justify-content-center align-items-center'>
					<Button variant='warning' className='px-2' onClick={handleShow}>
						<span className='pr-1'>
							<BsPlus />
						</span>
						Add Department
					</Button>
				</Col>
			</Row>

			<Row>
				<CustomTable values={department} elements={tableElements} type='dept' />
			</Row>

			<CustomModal
				show={show}
				onClose={handleClose}
				heading='Add Department'
			>
                <DepartmentForm />
            </CustomModal>
		</Container>
	);
};

export default Department;
