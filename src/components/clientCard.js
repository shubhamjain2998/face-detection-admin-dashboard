import React from 'react';
import { Card, Button, Image } from 'react-bootstrap';

const ClientCard = (props) => {
	return (
		<Card>
			<div className='d-flex justify-content-center'>
				<Image
					src={props.src}
					alt=''
					fluid
					roundedCircle
					className='w-25'
				/>
			</div>

			<Card.Body className="d-flex flex-column align-items-center">
				<Card.Title>{props.title}</Card.Title>
				<Card.Text className="my-0" >{props.name} </Card.Text>
                <p className="font-weight-light text-secondary">{props.position}</p>
				<div className='d-flex justify-content-center flex-wrap'>
					<Button variant='outline-secondary' className='mx-1 my-1'>
						Message
					</Button>
					<Button variant='outline-secondary' className='mx-1 my-1'>
						View Profile
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
};

export default ClientCard;
