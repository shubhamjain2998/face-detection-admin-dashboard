import React from 'react';
import Logo from '../components/logo';
import LoginForm from '../components/loginForm';
import { Card } from 'react-bootstrap';

const Login = () => {
	return (
		<div
			style={{ minHeight: '100vh', backgroundColor: 'rgba(240,240,240)' }}
			className='d-flex justify-content-center align-items-center flex-column'
		>
			<Logo />
			<Card className='my-3' style={{ minWidth: '30%' }}>
				<Card.Body>
					<LoginForm />
				</Card.Body>
			</Card>
		</div>
	);
};

export default Login;
