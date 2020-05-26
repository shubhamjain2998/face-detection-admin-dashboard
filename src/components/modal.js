import React from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = (props) => {
	return (
		<>
			<Modal show={props.show} onHide={props.onClose} size='lg' animation={false}>
				<Modal.Header closeButton>{props.heading}</Modal.Header>
				{props.children}
			</Modal>
		</>
	);
};

export default CustomModal;
