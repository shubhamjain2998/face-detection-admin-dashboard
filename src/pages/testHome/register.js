import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import OrganizationForm from '../../components/Forms/orgForm';
import AccountForm from '../../components/Forms/accountForm';
import Register from '../Registration/register';


const RegisterTab = () => {
	return (
		<Tab.Container defaultActiveKey='user'>
			<Row className='formTabs align-items-center'>
				<Col xs={4} className='pr-0'>
					<Nav variant='pills'>
						<Nav.Item>
							<Nav.Link eventKey='user'>
								<small>Step 1</small>
								<p className='mb-0 h7'>Register</p>
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Col>
				<Col xs={4} className='px-0'>
					<Nav variant='pills'>
						<Nav.Item>
							<Nav.Link eventKey='org'>
								<small>Step 2</small>
								<p className='mb-0 h7'>Organization Details</p>
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Col>
				<Col xs={4} className='pl-0'>
					<Nav variant='pills'>
						<Nav.Item>
							<Nav.Link eventKey='dept'>
								<small>Step 3</small>
								<p className='mb-0 h7'>personal details</p>
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Col>
			</Row>
			<Row>
				<Col sm={12}>
					<Tab.Content className='tabContent'>
						<Tab.Pane eventKey='user'>
							<Register />
						</Tab.Pane>
						<Tab.Pane eventKey='org'>
							<OrganizationForm />
						</Tab.Pane>
						<Tab.Pane eventKey='dept'>
							<AccountForm />
						</Tab.Pane>
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default RegisterTab;
