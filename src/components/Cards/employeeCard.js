import React, { useState } from 'react';
import { Card, Button, Image, Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CustomModal from '../modal';
import AccountForm from '../Forms/accountForm';
import defaultImg from '../../assets/avatar-02.jpg';

const EmployeeCard = ({ employee, onDelete }) => {
	const [show, setShow] = useState(false);
	const [emp, setEmp] = useState(employee);

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<Button
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
			variant='transparent'
		>
			{/* Render custom icon here */}
			<BsThreeDotsVertical />
			{/* &#x25bc; */}
			{children}
		</Button>
	));

	const editingHandler = (updatedEmp) => {
		setEmp(updatedEmp);
		setShow(false);
	};

	return (
		<Card>
			<Card.Title className='mb-0'>
				<span className='float-right text-secondary' style={{ cursor: 'pointer' }}>
					<Dropdown>
						<Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components' />
						<Dropdown.Menu>
							<Dropdown.Item onClick={handleShow}>Edit</Dropdown.Item>
							<Dropdown.Item onClick={() => onDelete(emp.pk)}>Delete</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</span>
			</Card.Title>
			<div className='d-flex justify-content-center py-1'>
				<Image
					src={defaultImg}
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
					className='font-weight-light text-secondary'
					style={{ overflowWrap: 'anywhere' }}
				>
					{emp.role}
				</p>
			</Card.Body>
			<CustomModal show={show} onClose={handleClose} heading='Edit Employee Details'>
				<AccountForm edit values={emp} onEditingDone={editingHandler} />
			</CustomModal>
		</Card>
	);
};

export default EmployeeCard;
