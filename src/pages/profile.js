import React from 'react';
import Heading from '../components/heading';
import ProfileCard from '../components/Cards/profileCard';
import { Container, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import EmployeeCard from '../components/Cards/employeeCard';
import CountUp from 'react-countup';
import Department from './department';

const Profile = (props) => {
	console.log(props.location);

	const Employees = useSelector((state) => state.acc.list);
	const orgAccount = props.location.state.acc;
	const org = props.location.state.org;
	const totalUser = useSelector((state) => state.user.list);
	const totalAcc = useSelector((state) => state.acc.list);

	const orgEmployees = Employees.filter((emp) => emp.orgId === org.pk);

	return (
		<Container fluid>
			<Heading name='Profile' link='profile' />
			<Row className='my-2 justify-content-end'>
				<Col xs={6} sm={4} lg={2}>
					<Button variant='outline-danger' block>
						Reset Password
					</Button>
				</Col>
			</Row>
			<div className='profile-wrapper'>
				<div className='profile'>
					<ProfileCard account={orgAccount} org={org} />
				</div>
				<div className='profile-stats'>
					<div className='profile-stats-card'>
						<h2>
							<CountUp end={totalAcc.length} duration={3} />
						</h2>
						<p>Employees registered</p>
					</div>
					<div className='profile-stats-card'>
						<h2>
							<CountUp end={totalUser.length} duration={3} />
						</h2>
						<p>Active Users</p>
					</div>
				</div>
				<div className='profile-tabs'>
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
						<Tab eventKey='department' title='Departments'>
							<Department profile />
						</Tab>
					</Tabs>
				</div>
			</div>
		</Container>
	);
};

export default Profile;
