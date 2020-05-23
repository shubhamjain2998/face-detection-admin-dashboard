import React from 'react';
import { Row, Col, Image, Button, Container } from 'react-bootstrap';
import john from '../../assets/avatar-02.jpg';

const ProfileCard = () => {
	return (
		<Container fluid>
			<Row className='profile-card py-3 mx-3 px-3'>
				<Col xs={12} md={6} className='profile-card-left pb-4'>
					<Row>
						<Col
							sm={4}
							md={3}
							lg={2}
							className='d-flex justify-content-center align-items-start'
						>
							<Image src={john} alt='' fluid roundedCircle />
						</Col>
						<Col>
							<h5>Global Technologies</h5>
							<p className='mb-0 h7 font-weight-bold'>Barry Cuda</p>
							<p className='mb-1 h7 font-weight-light'>CEO</p>
							<p className='h8 font-weight-bold'>Employee ID: CLT-0001</p>
							<Button variant='warning'>Send Message</Button>
						</Col>
					</Row>
				</Col>
				<Col xs={12} md={6} className='pl-4 pt-3'>
					<Row>
						<Col xs={4}>
							{['Phone:', 'Email:', 'Birthday:', 'Address:', 'Gender:'].map((f, i) => (
								<p key={f + i} className='mb-1 py-1 h7 '>
									{f}
								</p>
							))}
						</Col>
						<Col xs={8}>
							{[
								'9876543210',
								'barrycuda@example.com',
								'2nd August',
								'5754 Airport Rd, Coosada, AL, 36020',
								'Male',
							].map((f, i) => (
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
