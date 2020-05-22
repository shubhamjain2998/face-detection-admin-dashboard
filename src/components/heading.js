import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Heading = (props) => (
	<>
		<h4 style={{ paddingLeft: '1rem' }}>{props.name}</h4>
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to='/'>Dashboard</Link>
			</Breadcrumb.Item>
			<Breadcrumb.Item active>{props.link} </Breadcrumb.Item>
		</Breadcrumb>
	</>
);

export default Heading;
