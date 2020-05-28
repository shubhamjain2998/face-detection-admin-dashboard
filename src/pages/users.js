import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Heading from '../components/heading';

const Users = () => {
	return (
		<Container fluid>
			<Row>
				<Col lg={9}>
					<Heading name='Users' link='users' />
				</Col>
			</Row>
		</Container>
	);
};

export default Users;
