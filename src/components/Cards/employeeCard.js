import React, { useState } from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import CustomModal from '../modal';
import AccountForm from '../Forms/accountForm';
import defaultImg from '../../assets/user.svg';
import { MdEdit } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import TrainingImages from '../trainingImages';
import DeleteModal from '../deleteModal';

const EmployeeCard = ({ employee, onDelete }) => {
	const [show, setShow] = useState(false);
	const [showTraining, setShowTraining] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [emp, setEmp] = useState(employee);

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const handleShowTraining = () => setShowTraining(true);
	const handleCloseTraining = () => setShowTraining(false);

	const handleShowDelete = () => setShowDelete(true);
	const handleCloseDelete = () => setShowDelete(false);

	const editingHandler = (updatedEmp) => {
		setEmp(updatedEmp);
		setShow(false);
	};

	const DeleteEmployee = () => {
		onDelete(emp.empId);
	};

	return (
		<Card className='emp-card position-relative'>
			<Card.Title className='mb-0 position-absolute w-100'>
				<span className='float-right mx-2 my-2' style={{ cursor: 'pointer' }}>
					<MdEdit className='mx-1 text-primary' onClick={handleShow} />
					<BsTrash className='mx-1 text-danger' onClick={handleShowDelete} />
				</span>
			</Card.Title>
			<div className='d-flex justify-content-center pb-1 pt-3'>
				<Image
					src={emp.profileImg ? emp.profileImg : defaultImg}
					alt=''
					fluid
					roundedCircle
					style={{ width: '20%' }}
				/>
			</div>
			<Card.Body className='d-flex flex-column align-items-center py-2'>
				<h6 className='mb-1 text-center'>{emp.firstName + ' ' + emp.lastName}</h6>
				{/* <p className='my-0 pt-1'>{props.name} </p> */}
				<p
					className='font-weight-light text-secondary mb-1'
					style={{ overflowWrap: 'anywhere' }}
				>
					{emp.role}
				</p>

				<Button onClick={handleShowTraining} variant='outline-primary' size='sm'>
					Setup Face Detection
				</Button>
			</Card.Body>
			<CustomModal
				show={show}
				onClose={handleClose}
				heading='Edit Employee Details'
			>
				<AccountForm edit values={emp} onEditingDone={editingHandler} />
			</CustomModal>
			<CustomModal
				show={showTraining}
				onClose={handleCloseTraining}
				heading='Train Images for Attendance'
			>
				<TrainingImages employee={emp} />
			</CustomModal>
			<DeleteModal
				show={showDelete}
				onDeleteHandler={DeleteEmployee}
				handleClose={handleCloseDelete}
			/>
		</Card>
	);
};

export default EmployeeCard;
