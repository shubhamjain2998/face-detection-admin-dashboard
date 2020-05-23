import React from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ClientCard = (props) => {
	return (
		<Card>
			<div className='d-flex justify-content-center pt-3 pb-1'>
				<Image src={props.src} alt='' fluid roundedCircle style={{width: '20%'}} />
			</div>
			<Card.Body className='d-flex flex-column align-items-center py-2'>
				<h6 className="mb-1 text-center">{props.title}</h6>
				<p className='my-0 pt-1'>{props.name} </p>
				<p className='font-weight-light text-secondary'>{props.position}</p>
				<div className='d-flex justify-content-center flex-wrap'>
					<Button variant='outline-secondary' className='mx-1 my-1'>
						Message
					</Button>
					<Link to='/profile'>
						<Button variant='outline-secondary' className='mx-1 my-1'>
							View Profile
						</Button>
					</Link>
				</div>
			</Card.Body>
		</Card>
	);
};

export default ClientCard;
