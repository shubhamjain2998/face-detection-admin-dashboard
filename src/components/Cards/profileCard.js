import React from 'react';
import { Row, Col, Image, Button, Container } from 'react-bootstrap';
// import john from '../../assets/avatar-02.jpg';

const ProfileCard = ({ account, org }) => {
	// console.log(props.location);
	// const account = props.location.state.acc;
	// const name = props.location.state.name;

	const fields = ['Phone:', 'Email:', 'Gender:'];
	const values = [account.phone, account.emailId, account.gender];

	return (
		<Container fluid>
			<Row className='py-3 mx-3 px-3'>
				<Col xs={12} md={6} className='profile-card-left pb-4'>
					<Row>
						<Col
							sm={4}
							md={3}
							lg={2}
							className='d-flex justify-content-center align-items-start'
						>
							<Image src={account.profileImg} alt='' fluid roundedCircle />
						</Col>
						<Col>
							<h5>{org.Name}</h5>
							<p className='mb-0 h7 font-weight-bold'>
								{account.firstName + ' ' + account.lastName}
							</p>
							<p className='mb-1 h7 font-weight-light'>Admin</p>
							<p className='h8 font-weight-bold'>
								{account.idType}: {account.idProof}
							</p>
							<Button variant='warning'>Send Message</Button>
						</Col>
					</Row>
				</Col>
				<Col xs={12} md={6} className='pl-4 pt-3'>
					<Row>
						<Col xs={4}>
							{fields.map((f, i) => (
								<p key={f + i} className='mb-1 py-1 h7 '>
									{f}
								</p>
							))}
						</Col>
						<Col xs={8}>
							{values.map((f, i) => (
								<p key={f + i} className='mb-1 py-1 text-secondary h7'>
									{f}
								</p>
							))}
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default ProfileCard;
