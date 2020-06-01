import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = (props) => {
	return (
		<Modal show={props.show} onHide={props.handleClose} animation={false}>
			<Modal.Body>Are you sure you want to delete?</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-success' onClick={props.handleClose}>
					Cancel
				</Button>
				<Button variant='outline-danger' onClick={props.onDeleteHandler}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteModal;
