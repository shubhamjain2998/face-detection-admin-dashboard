import React from 'react';
import Heading from '../components/heading';
import ProfileCard from '../components/Cards/profileCard';
import { Container, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import EmployeeCard from '../components/Cards/employeeCard';

const Profile = (props) => {
	console.log(props.location);

	const Employees = useSelector((state) => state.acc.list);
	const orgAccount = props.location.state.acc;
	const org = props.location.state.org;

	const orgEmployees = Employees.filter((emp) => emp.orgId === org.pk);

	return (
		<Container fluid>
			<Heading name='Profile' link='profile' />
			<Row className='my-2 justify-content-end'>
				<Col xs={6} sm={4} lg={2}>
					<Button variant='outline-danger' block>Reset Password</Button>
				</Col>
			</Row>
			<ProfileCard account={orgAccount} org={org} />
			<hr></hr>
			<Row className='my-2'>
				<Col sm={{ span: 10, offset: 1 }} xs={12} className='profile-tabs'>
					<Tabs
						defaultActiveKey='employee'
						id='uncontrolled-tab-example'
						className='mt-3 text-primary'
					>
						<Tab eventKey='employee' title='Employees'>
							<Row>
								{orgEmployees.map((oe) => (
									<Col key={oe.pk} xs={6} lg={3} className='my-2'>
										<EmployeeCard employee={oe} />
									</Col>
								))}
							</Row>
						</Tab>
						<Tab eventKey='department' title='Departments'></Tab>
					</Tabs>
				</Col>
			</Row>
		</Container>
	);
};

export default Profile;
