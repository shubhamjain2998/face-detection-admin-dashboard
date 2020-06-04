import React, { useState } from 'react';
import { Container, Row, Button, Col, Image } from 'react-bootstrap';
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
	const [error, setError] = useState(null);

	const onDropHandler = (files) => {
		if (files.length > 50) {
			setError('Maximum 50 files are allowed for uploading.');
			setFiles(null);
		} else {
			setFiles(files);
		}
	};

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
				setError(err.message);
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

				{files &&
					files.map((file, i) => {
						const prev = URL.createObjectURL(file);
						return (
							<Col xs={4} md={3} key={file.name + i} className='my-2'>
								<div className='position-relative'>
									<Image src={prev} alt={file.name} fluid />
								</div>
							</Col>
						);
					})}

				{files && (
					<p className='my-2 text-info mx-2 w-100'>
						{files.length + ' files selected'}
					</p>
				)}

				{message && <p className='my-2 text-info mx-2 w-100'>{message}</p>}

				{error && <p className='my-2 text-danger mx-2 w-100'>{error}</p>}
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

			<Row className='my-3'>
				<Col xs={12} className='my-1 mx-3'>
					<small className='text-secondary'>
						<b>Note:</b> Image Uploading and Training may take time. Please wait for a
						while.
					</small>
				</Col>
				<Col md={{ span: 6, offset: 3 }} className='my-3'>
					<Button
						block
						variant='outline-primary'
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
