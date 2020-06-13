import React, { useEffect, useState } from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import OrganizationForm from '../../components/Forms/orgForm';
import AccountForm from '../../components/Forms/accountForm';
import { useSelector } from 'react-redux';
import LoginForm from '../../components/Forms/loginForm';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { Redirect } from 'react-router';

const RegisterTab = (props) => {
	const user = useSelector((state) => state.user);
	const org = useSelector((state) => state.org);
	const account = useSelector((state) => state.acc);
	const [key, setKey] = useState('user');

	useEffect(() => {
		if (user.token && !org.details.pk) {
			setKey('org');
		} else if (user.token && org.details.pk && !account.details.pk) {
			setKey('acc');
		}
	}, [user.token, org.details.pk, account.details.pk]);

	// if (!user.error && !user.loading && user.user.pk) {
	// 	props.registered();
	// }

	return (
		<Tab.Container activeKey={key}>
			{user.token && org.details.pk && account.details.pk && (
				<Redirect to='/home' />
			)}
			<Row className='formTabs'>
				<>
					<Nav variant='pills'>
						<Col xs={4}>
							<Nav.Item>
								<Nav.Link eventKey='user' disabled={user.token}>
									<small>Step 1</small>
									<p className='mb-0 h7'>Register</p>
								</Nav.Link>
							</Nav.Item>
						</Col>
						<Col xs={4}>
							<Nav.Item>
								<Nav.Link eventKey='org' disabled={!user.token}>
									<small>Step 2</small>
									<p className='mb-0 h7'>Organization Details</p>
								</Nav.Link>
							</Nav.Item>
						</Col>
						<Col xs={4}>
							<Nav.Item>
								<Nav.Link
									eventKey='acc'
									disabled={!user.token || (user.token && !org.details.pk)}
								>
									<small>Step 3</small>
									<p className='mb-0 h7'>Personal Details</p>
								</Nav.Link>
							</Nav.Item>
						</Col>
					</Nav>
				</>
			</Row>
			<Row>
				<Col sm={12}>
					<Tab.Content className='tabContent'>
						<Tab.Pane eventKey='user'>
							<LoginForm register />
							<div className='d-flex justify-content-center my-3'>
								<PropagateLoader
									size={15}
									color={'#654aa1'}
									loading={user.loading}
									// loading={true}
								/>
								{user.error && <p className='text-danger text-capitalize'>{user.error}</p>}
							</div>
						</Tab.Pane>
						<Tab.Pane eventKey='org'>
							<OrganizationForm />
							<div className='d-flex justify-content-center mt-3'>
								<PropagateLoader
									size={15}
									color={'#654aa1'}
									loading={org.loading}
									// loading={true}
								/>
								{org.error && <p className='text-danger text-capitalize'>{org.error}</p>}
							</div>
						</Tab.Pane>
						<Tab.Pane eventKey='acc'>
							<AccountForm />
							<div className='d-flex justify-content-center mt-3'>
								<PropagateLoader
									size={15}
									color={'#654aa1'}
									loading={account.loading}
									// loading={true}
								/>
								{account.error && <p className='text-danger text-capitalize'>{account.error}</p>}
							</div>
						</Tab.Pane>
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default RegisterTab;
