import React, { useState, useEffect } from 'react';
import './testhome.scss';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import bgImg from '../../assets/bg-removebg-preview.png';
import RegisterTab from './register';
import Login from '../Registration/login';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
	const [choice, setChoice] = useState('login');
	const [css, setCss] = useState('');
	const user = useSelector((state) => state.user);
	const org = useSelector((state) => state.org);
	const acc = useSelector((state) => state.acc);
	let redirect = null;

	const onLogin = () => {
		setChoice('login');
	};

	const onRegister = () => {
		setChoice('register');
	};

	useEffect(() => {
		if (!user.error && !user.loading && user.user.pk) {
			setChoice('login');
		}
	}, [user.error, user.loading, user.user.pk]);

	useEffect(() => {
		if (!user.user.is_superuser && user.token && !org.details.pk) {
			setChoice('register');
		}
	}, [user.token, user.user.is_superuser, org.details.pk]);

	return (
		<Container fluid className='outer-container'>
			{user.token && org.details.pk && acc.details.pk && <Redirect to='/home' />}
			{user.token && user.user.is_superuser && <Redirect to='/home' />}
			<Row className='innerContainer justify-content-around'>
				<Col xs={12} lg={5} className='pt-4 px-4 roleSelect'>
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
				<Col xs={12} lg={5} className='forms rightSide'>
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
						<RegisterTab registered={onLogin} />
					)}
				</Col>
				{/* <div className='clearfix'></div> */}
			</Row>
		</Container>
	);
};

export default Home;
