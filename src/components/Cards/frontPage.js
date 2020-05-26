import React from 'react';
import Logo from '../logo';
import { Card } from 'react-bootstrap';

const FrontPage = (props) => {
	return (
		<div
			style={{ minHeight: '100vh', backgroundColor: 'rgba(240,240,240)' }}
			className='d-flex justify-content-center align-items-center flex-column'
		>
			<div style={{ maxWidth: '50%' }}>
				<Logo />
			</div>

			<Card className='my-3 frontPageCard'>
				<Card.Body>{props.children}</Card.Body>
			</Card>
		</div>
	);
};

export default FrontPage;
