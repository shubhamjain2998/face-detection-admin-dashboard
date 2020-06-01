import React from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = (props) => {
	return (
		<>
			<Modal
				show={props.show}
				onHide={props.onClose}
				size='lg'
				animation={false}
				scrollable={true}
			>
				<Modal.Header closeButton>{props.heading}</Modal.Header>
				<Modal.Body>{props.children}</Modal.Body>
			</Modal>
		</>
	);
};

export default CustomModal;
