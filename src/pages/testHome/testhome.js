import React, { useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	Form,
	Image,
	Alert,
	Button,
} from 'react-bootstrap';
import bgImg from '../../assets/bg-removebg-preview.png';
import RegisterTab from './register';
import Login from '../Registration/login';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
	const [choice, setChoice] = useState('login');
	const user = useSelector((state) => state.user);
	const org = useSelector((state) => state.org);
	const acc = useSelector((state) => state.acc);
	const sw = useSelector((state) => state.sw);
	const [showError, setShowError] = useState(false);

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
		if (
			!user.user.is_superuser &&
			user.token &&
			!org.details.pk &&
			!org.loading
		) {
			setChoice('register');
		}
	}, [user.token, user.user.is_superuser, org.details.pk, org.loading]);

	useEffect(() => {
		// console.log(sw.updated);
		if (sw.updated) {
			setShowError(true);
		}
	}, [sw.updated]);

	const updateServiceWorker = () => {
		const registrationWaiting = sw.registered.waiting;
		// console.log(sw.registered);

		if (registrationWaiting) {
			registrationWaiting.postMessage({ type: 'SKIP_WAITING' });

			registrationWaiting.addEventListener('statechange', (e) => {
				if (e.target.state === 'activated') {
					window.location.reload();
				}
			});
		}
	};

	return (
		<Container fluid className='outer-container'>
			{user.token && org.details.pk && acc.details.pk && <Redirect to='/home' />}
			{user.token && user.user.is_superuser && <Redirect to='/home' />}
			{/* {sw.initialized && alert('page has been saved for offline use')} */}
			{sw.updated && (
				<Row className='py-3 mb-2 justify-content-center'>
					<Col xs={12} md={6}>
						<Alert
							show={showError}
							variant='primary'
							className='shadow'
							onClose={() => setShowError(false)}
							dismissible
						>
							<p className='text-capitalize'>New Version of App is available.</p>
							<div className='d-flex justify-content-end'>
								<Button onClick={updateServiceWorker} variant='outline-primary'>
									Update
								</Button>
							</div>
						</Alert>
					</Col>
				</Row>
			)}
			<Row className='inner-container justify-content-center w-100'>
				<Col xs={12} lg={5} className='pt-4 px-4 roleSelect'>
					<Col xs={12} className='mt-4'>
						<div className='bg'>
							<Image fluid src={bgImg} alt=''></Image>
						</div>
					</Col>
				</Col>
				<Col xs={10} lg={5} className='forms rightSide'>
					{choice === 'login' ? (
						<div className='login-tab'>
							<div className='heading'>
								<p>
									Hello, <br></br>Welcome Back
								</p>
							</div>
							<Login />
						</div>
					) : (
						<RegisterTab registered={onLogin} />
					)}
					<Form className='mb-3 pb-3'>
						<Form.Row className='justify-content-around'>
							<Col
								xs={4}
								className={
									choice === 'login' ? 'radioButton radioButton-active' : 'radioButton'
								}
								onClick={onLogin}
							>
								<p>Login</p>
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
								<p>Register</p>
							</Col>
						</Form.Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
