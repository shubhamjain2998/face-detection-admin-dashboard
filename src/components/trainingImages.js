import React, { useState } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { css } from '@emotion/core';
import Dropzone from 'react-dropzone';
import axios from '../axios-faceDet';
import BarLoader from 'react-spinners/BarLoader';

const override = css`
	display: block;
	margin: 0 auto;
	width: 100%;
`;

const TrainingImages = (props) => {
	const [files, setFiles] = useState(null);
	const [uploadLoading, setUploadLoading] = useState(false);
	const [message, setMessage] = useState(null);

	const onDropHandler = (files) => setFiles(files);

	const onSubmitHandler = () => {
		console.log(files);
		setUploadLoading(true);
		const formData = new FormData();
		formData.append('EmpId', props.employee.empId);
		files.map((file) => formData.append('image', file));

		axios
			.post('attendance/train_dataset/', formData)
			.then((res) => {
				console.log(res);
				setMessage(res.data.status);
				setUploadLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setMessage(err.message);
				setUploadLoading(false);
			});
	};

	return (
		<Container>
			<Row className='px-3 my-4'>
				<Dropzone onDrop={onDropHandler}>
					{({ getRootProps, getInputProps }) => (
						<div {...getRootProps()} className='py-2 px-3 mx-2 uploadBox'>
							<input {...getInputProps()} />
							<p className='text-center text-primary'>
								Drag 'n' drop some files here, or click to select files
							</p>
						</div>
					)}
				</Dropzone>
				{files && (
					<p className='my-2 text-info mx-2 w-100'>{files.length + ' files selected'}</p>
				)}

				{message && <p className='my-2 text-info mx-2 w-100'>{message}</p>}
			</Row>

			<div className='w-100 my-3'>
				<BarLoader
					height={4}
					width={100}
					color={'#1565C0'}
					loading={uploadLoading}
					// loading={true}
					css={override}
				/>
			</div>

			<Row className='mt-3'>
				<Col md={{ span: 6, offset: 3 }}>
					<Button
						block
						variant='outline-success'
						onClick={onSubmitHandler}
						disabled={!files}
					>
						Upload
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default TrainingImages;
