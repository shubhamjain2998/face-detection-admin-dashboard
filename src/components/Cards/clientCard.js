import React, { useState, useEffect } from 'react';
import { Card, Button, Image, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from '../../axios-faceDet';
import CustomModal from '../modal';
import OrganizationForm from '../Forms/orgForm';

const ClientCard = ({ client, onDelete }) => {
	const [show, setShow] = useState(false);
	const [org, setOrg] = useState(client);

	const [account, setAccount] = useState(null);

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

	useEffect(() => {
		// TODO: Add User
		axios
			.get('/attendance/api/accounts/filter?orgId=' + org.pk)
			.then((res) => {
				// console.log(res.data);
				setAccount(res.data[0]);
			})
			.catch((err) => console.log(err));
	}, [org.pk]);

	const editingHandler = (updatedOrg) => {
		setOrg(updatedOrg);
		setShow(false);
	};

	return (
		<Card className='profile-card'>
			<div className='d-flex justify-content-center pt-3 pb-1'>
				<Image src={org.src} alt='' fluid roundedCircle style={{ width: '20%' }} />
			</div>
			<Card.Title className='mb-0'>
				<span className='float-right text-secondary' style={{ cursor: 'pointer' }}>
					<Dropdown>
						<Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components' />
						<Dropdown.Menu>
							<Dropdown.Item onClick={handleShow}>Edit</Dropdown.Item>
							<Dropdown.Item onClick={() => onDelete(org.pk)}>Delete</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</span>
			</Card.Title>
			<Card.Body className='d-flex flex-column align-items-center py-2'>
				<h6 className='mb-1 text-center'>{org.Name}</h6>
				{/* <p className='my-0 pt-1'>{props.name} </p> */}
				<p className='font-weight-light text-secondary'>{org.orgType}</p>
				<div className='d-flex justify-content-center flex-wrap'>
					<Button variant='outline-secondary' className='mx-1 my-1'>
						Message
					</Button>
					<Link
						to={{
							pathname: '/profile',
							state: { acc: account, org: org },
						}}
					>
						<Button
							variant='outline-secondary'
							className='mx-1 my-1'
							disabled={account == null}
						>
							View Profile
						</Button>
					</Link>
				</div>
			</Card.Body>
			<CustomModal show={show} onClose={handleClose} heading='Edit Client Details'>
				<OrganizationForm edit values={org} onEditingDone={editingHandler} />
			</CustomModal>
		</Card>
	);
};

export default ClientCard;
