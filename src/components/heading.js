import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Heading = (props) => (
	<div className='pt-3'>
		<h4 style={{ paddingLeft: '1rem' }}>{props.name}</h4>
		{/* <Breadcrumb>
			<Link to='/home' className='breadcrumb-item'>
				Dashboard
			</Link>
			<Breadcrumb.Item active>{props.link} </Breadcrumb.Item>
		</Breadcrumb> */}
	</div>
);

export default Heading;
