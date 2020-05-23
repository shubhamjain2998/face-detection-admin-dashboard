import React, { useState } from 'react';
import ClientCard from '../components/Cards/clientCard';
import Heading from '../components/heading';
import john from '../assets/avatar-02.jpg';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import { BsPlus, BsGrid3X3Gap } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import CustomModal from '../components/modal';
import CustomTable from '../components/table';
import AccountForm from '../components/Forms/accountForm';
// import { Form } from 'formik';

const clients = [
	{
		src: john,
		title: 'Global Technologies',
		name: 'Barry Cuda',
		position: 'CEO',
	},
	{
		src: john,
		title: 'Global Technologies',
		name: 'Barry Cuda',
		position: 'CEO',
	},
	{
		src: john,
		title: 'Global Technologies',
		name: 'Barry Cuda',
		position: 'CEO',
	},
	{
		src: john,
		title: 'Global Technologies',
		name: 'Barry Cuda',
		position: 'CEO',
	},
	{
		src: john,
		title: 'Global Technologies',
		name: 'Barry Cuda',
		position: 'CEO',
	},
	{
		src: john,
		title: 'Global Technologies',
		name: 'Barry Cuda',
		position: 'CEO',
	},
	{
		src: john,
		title: 'Global Technologies',
		name: 'Barry Cuda',
		position: 'CEO',
	},
	{
		src: john,
		title: 'Global Technologies',
		name: 'Barry Cuda',
		position: 'CEO',
	},
	{
		src: john,
		title: 'Global Technologies',
		name: 'Barry Cuda',
		position: 'CEO',
	},
	{
		src: john,
		title: 'Global Technologies',
		name: 'Barry Cuda',
		position: 'CEO',
	},
];



const Clients = () => {
	const [show, setShow] = useState(false);
	const [showCard, setShowCard] = useState(true);

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const onShowCards = () => setShowCard(true);
	const onShowTable = () => setShowCard(false);

	return (
		<Container fluid>
			<Row >
				<Col lg={9}>
					<Heading name='Clients' link='client' />
				</Col>
				<Col lg={3} className='d-flex justify-content-center align-items-center'>
					<span className='px-2 makeLink' onClick={onShowCards}>
						<BsGrid3X3Gap />
					</span>
					<span className='px-2 makeLink' onClick={onShowTable}>
						<FaBars />
					</span>
					<Button variant='warning' className='px-2' onClick={handleShow}>
						<span className='pr-1'>
							<BsPlus />
						</span>
						Add Client
					</Button>
				</Col>
			</Row>
			<Form>
				<Form.Row>
					<Col className='my-2' xs={12} sm={6} md={3}>
						<Form.Control type='text' placeholder='Client ID'></Form.Control>
					</Col>
					<Col className='my-2' xs={12} sm={6} md={3}>
						<Form.Control type='text' placeholder='Client Name'></Form.Control>
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

			{showCard && (
				<Row>
					{clients.map((client, i) => (
						<Col key={client.name + i} xs={12} sm={6} md={4} lg={3} className='my-3'>
							<ClientCard
								src={client.src}
								title={client.title}
								name={client.name}
								position={client.position}
							></ClientCard>
						</Col>
					))}
				</Row>
			)}

			{!showCard && (
				<Row>
					<CustomTable />
				</Row>
			)}

			<CustomModal show={show} onClose={handleClose}>
				<AccountForm />
			</CustomModal>
		</Container>
	);
};

export default Clients;
