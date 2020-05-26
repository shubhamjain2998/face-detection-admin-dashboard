import React, { useState, useEffect } from 'react';
import ClientCard from '../components/Cards/clientCard';
import Heading from '../components/heading';
// import john from '../assets/avatar-02.jpg';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import { BsPlus, BsGrid3X3Gap } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import CustomModal from '../components/modal';
import CustomTable from '../components/table';
import axios from '../axios-faceDet';
import OrganizationForm from '../components/Forms/orgForm';

const Clients = () => {
	const [show, setShow] = useState(false);
	const [showCard, setShowCard] = useState(true);

	const [orgs, setOrgs] = useState(null);
	const [fetchedOrgs, setFetchedOrgs] = useState(false);

	const clientTemplate = {
		pk: '',
		Name: '',
		orgType: '',
		contact: '',
		staffcount: '',
		logo: '',
	};

	useEffect(() => {
		if (!fetchedOrgs) {
			axios.get('attendance/api/org').then((res) => {
				console.log(res.data);
				setOrgs(res.data);
				setFetchedOrgs(true);
			});
		}
	}, [fetchedOrgs]);

	const onDeleteHandler = (id) => {
		axios
			.delete('/attendance/api/org/' + id + '/')
			.then((res) => {
				console.log(res.data);
				setFetchedOrgs(false);
			})
			.catch((err) => console.log(err));
	};

	// let clients = [];

	// if (orgs) {
	// 	clients = orgs.map((org, i) => ({
	// 		src: org.logo,
	// 		title: org.Name,
	// 		orgType: org.orgType,
	// 	}));
	// }

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const onShowCards = () => setShowCard(true);
	const onShowTable = () => setShowCard(false);

	const addingDone = (newOrg) => {
		const temp = orgs;
		temp.push(newOrg);
		setOrgs(temp);
		setShow(false);
	};

	const tableElements = ['Name', 'Type', 'Contact Number', 'Staff Count']

	return (
		<Container fluid>
			<Row>
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

			{showCard && orgs && (
				<Row>
					{orgs.map((org, i) => (
						<Col key={org.Name + i} xs={12} sm={6} md={4} lg={3} className='my-3'>
							<ClientCard client={org} onDelete={onDeleteHandler}></ClientCard>
						</Col>
					))}
				</Row>
			)}

			{!showCard && (
				<Row>
					<CustomTable elements={tableElements} values={orgs} type='client' />
				</Row>
			)}

			<CustomModal show={show} onClose={handleClose} heading='Add Client'>
				<OrganizationForm
					add
					values={clientTemplate}
					onEditingDone={addingDone}
				/>
			</CustomModal>
		</Container>
	);
};

export default Clients;
