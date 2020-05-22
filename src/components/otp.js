import React, { useRef } from 'react';
import { Formik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';

const OTP = () => {
	const digit1 = useRef(null);
	const digit2 = useRef(null);
	const digit3 = useRef(null);
	const digit4 = useRef(null);

	const onSubmitHandler = (values) => {
		console.log(values);
		console.log(digit1);
	};

	const elements = [
		{ name: 'digit1', ref: digit1 },
		{ name: 'digit2', ref: digit2 },
		{ name: 'digit3', ref: digit3 },
		{ name: 'digit4', ref: digit4 },
	];

	return (
		<div className='d-flex align-items-center flex-column'>
			<h5>OTP</h5>
			<p>Verify Your Account</p>

			<Formik
				initialValues={{ digit1: '', digit2: '', digit3: '', digit4: '' }}
				onSubmit={onSubmitHandler}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					isValid,
				}) => (
					<Form noValidate onSubmit={handleSubmit} className='w-100'>
						<Form.Group>
							<Form.Row>
								{elements.map((el) => (
									<Col key={el.name} className='mx-1 OTP'>
										<Form.Control
											name={el.name}
											ref={el.ref}
											type='text'
											onChange={handleChange}
											placeholder='0'
											onBlur={handleBlur}
											value={values[el.name]}
										></Form.Control>
									</Col>
								))}
							</Form.Row>
						</Form.Group>

						<Button
							variant='primary'
							type='submit'
							// disabled={isSubmitting || !isValid}
							className='w-100 mt-4 mb-1'
						>
							Enter
						</Button>
					</Form>
				)}
			</Formik>
			<div className='pt-2'>
				<p className='font-weight-light py-2'>
					Not yet received? <span className='text-primary'>Resend OTP</span>
				</p>
			</div>
		</div>
	);
};

export default OTP;
