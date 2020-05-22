import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Col } from 'react-bootstrap';

const ValidationSchema = Yup.object().shape({
	firstName: Yup.string().required('Required'),
	lastName: Yup.string().required('Required'),
	username: Yup.string().required('Required'),
	email: Yup.string().email('Invalid Email').required('Required'),
	password: Yup.string().required('Required'),
	confirmPassword: Yup.string().required('Required'),
	clientId: Yup.number().required('Required'),
	phone: Yup.number().min(10, 'Invalid Number!').required('Required'),
	companyName: Yup.string().required('Required'),
});

const ClientForm = (props) => {
	const [elements] = useState(props.elements);

	const onSubmitHandler = (values) => {
		console.log(values);
	};

	let initValue = {};

	for (let i in elements) {
		const obj = elements[i];
		initValue[obj.name] = obj.value;
	}

	return (
		<div className="mx-3 mb-3">
			{/* <div className='py-4 text-center text-primary'>
				<h4>{props.heading} </h4>
			</div> */}
			<Formik
				initialValues={initValue}
				onSubmit={onSubmitHandler}
				validationSchema={ValidationSchema}
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
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Row>
								{elements.map(
									(el, i) => (
										<Col md={6} key={el.name + i} className="my-3">
											<Form.Control
												name={el.name}
												type={el.type}
												placeholder={el.placeholder}
												onChange={handleChange}
												onBlur={handleBlur}
												value={values[el.name]}
												isValid={touched[el.name] && !errors[el.name]}
												isInvalid={touched[el.name] && errors[el.name]}
											></Form.Control>
											<Form.Control.Feedback type='invalid'>
												{errors[el.name]}
											</Form.Control.Feedback>
										</Col>
									)
									// console.log(el)
								)}
							</Form.Row>
						</Form.Group>
						<Button
							variant='warning'
							type='submit'
							disabled={isSubmitting || !isValid}
							block
						>
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ClientForm;
