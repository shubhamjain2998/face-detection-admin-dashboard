import React, { useState } from 'react';
import { Formik } from 'formik';
import { Form, Button, Col } from 'react-bootstrap';

const CustomForm = (props) => {
	const [elements] = useState(props.elements);

	// const onSubmitHandler = (values) => {
	// 	console.log(values);
	// };

	let initValue = {};

	for (let i in elements) {
		const obj = elements[i];
		initValue[obj.name] = obj.value;
	}

	return (
		<div className='mx-3 mb-3'>
			{/* <div className='py-4 text-center text-primary'>
				<h4>{props.heading} </h4>
			</div> */}
			<Formik
				initialValues={initValue}
				onSubmit={props.handleSubmit}
				validationSchema={props.validationSchema}
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
									(el, i) => {
										// if (el.type === 'file') {
										// 	return (

										// 	);
										// }
										// console.log(errors);
										return (
											<Col md={6} key={el.name + i} className='my-3'>
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
										);
									}
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

export default CustomForm;
