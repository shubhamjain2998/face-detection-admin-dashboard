import React, { useState, useEffect } from 'react';
import './testhome.scss';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import bgImg from '../../assets/bg-removebg-preview.png';
import RegisterTab from './register';
import Login from '../Registration/login';

const Home = () => {
	const [choice, setChoice] = useState('login');
	const [css, setCss] = useState('');

	const onLogin = () => {
		setChoice('login');
	};

	const onRegister = () => {
		// setChoice('register');
	};

	return (
		<Container fluid className='outer-container'>
			<Row className='innerContainer justify-content-around'>
				<Col md={5} className='pt-4 px-4 roleSelect'>
					<Col xs={12} className='my-4 login'>
						<div className='left-box'>
							<h6 className='mt-2'>Select Your Role</h6>
							<small className='text-secondary'>
								Choose a role that better defines you.
							</small>
							<Form className='my-3 py-3'>
								<Form.Row className='justify-content-around'>
									<Col
										xs={4}
										className={
											choice === 'login' ? 'radioButton radioButton-active' : 'radioButton'
										}
										onClick={onLogin}
									>
										<p>Registered User</p>
									</Col>
									<Col
										xs={4}
										className={
											choice === 'register'
												? 'radioButton radioButton-active'
												: 'radioButton'
										}
										onClick={onRegister}
									>
										<p>New User</p>
									</Col>
								</Form.Row>
							</Form>
						</div>
					</Col>
					<Col xs={12} className='mt-4'>
						<div className='bg'>
							<Image fluid src={bgImg} alt=''></Image>
						</div>
					</Col>
				</Col>
				<Col md={5} className='forms rightSide'>
					{choice === 'login' ? (
						<div className='login-tab'>
							<div className='heading'>
								<h3>
									Hello, <br></br>Welcome Back
								</h3>
							</div>
							<Login />
						</div>
					) : (
						<div className='register'>
							<RegisterTab />
						</div>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
