import React from 'react';
import { Row } from 'react-bootstrap';
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = (props) => (
	<Row className='justify-content-center'>
		<ClipLoader size={70} loading={props.loading} color='#09233b' />
	</Row>
);

export default Loader;
