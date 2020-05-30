import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

const TrainingImages = () => {
	return (
		<Container>
			<Row className='px-3'>
				<Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
					{({ getRootProps, getInputProps }) => (
						<div className='w-50 h-50'>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<p>Drag 'n' drop some files here, or click to select files</p>
							</div>
						</div>
					)}
				</Dropzone>
			</Row>
		</Container>
	);
};

export default TrainingImages;
