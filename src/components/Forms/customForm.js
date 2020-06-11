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
					isValid,
					setFieldValue,
				}) => (
					<Form noValidate onSubmit={handleSubmit} className='custom-forms'>
						<Form.Group>
							<Form.Row>
								{elements.map(
									(el, i) => {
										if (el.type === 'file') {
											const upFile = el.path ? el.path.split('/') : ['No file Uploaded'];
											return (
												<Col md={12} key={el.name + i} className='my-3'>
													<p className='text-primary'>
														<a href={el.path} rel='noopener noreferrer' target='_blank'>
															{'Current File: ' + upFile[upFile.length - 1]}
														</a>
													</p>
													<Form.File custom>
														<Form.File.Input
															name={el.name}
															type={el.type}
															onChange={(e) => {
																e.preventDefault();
																const file = e.target.files[0];
																setFieldValue(el.name, file);
															}}
															isValid={el.valid}
															isInvalid={!el.valid}
														/>
														<Form.File.Label data-browse='Select File'>
															{values[el.name] ? values[el.name].name : el.label}
														</Form.File.Label>
													</Form.File>

													<Form.Control.Feedback type='invalid'>
														{errors[el.name]}
													</Form.Control.Feedback>
												</Col>
											);
										}

										if (el.type === 'checkbox') {
											return (
												<Col md={6} lg={4} key={el.name + i} className='my-3'>
													<Form.Check
														label={el.label}
														inline
														name={el.name}
														type={el.type}
														placeholder={el.placeholder}
														onChange={handleChange}
														onBlur={handleBlur}
														value={values[el.name]}
														checked={values[el.name]}
													/>
												</Col>
											);
										}

										if (el.type === 'select') {
											return (
												<Col md={el.col ? el.col : 6} key={el.name + i} className='my-3'>
													<Form.Label>{el.label}</Form.Label>
													<Form.Control
														as='select'
														custom
														name={el.name}
														type={el.type}
														placeholder={el.placeholder}
														onChange={handleChange}
														onBlur={handleBlur}
														value={values[el.name]}
													>
														<option></option>
														{el.options.map((e, i) => {
															if (e.name) {
																return (
																	<option key={e + i} value={e.value}>
																		{e.name}
																	</option>
																);
															} else {
																return <option key={e + i}>{e}</option>;
															}
														})}
													</Form.Control>
												</Col>
											);
										}

										// console.log(values);
										// console.log(errors);
										return (
											<Col md={el.col ? el.col : 6} key={el.name + i} className='my-3'>
												<Form.Label>{el.label ? el.label : ''}</Form.Label>
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
												{el.helpText ? (
													<small className='form-text text-muted'>{el.helpText}</small>
												) : (
													''
												)}
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
						<Button variant='outline-primary' type='submit' disabled={!isValid} block>
							{props.filters ? 'Apply' : 'Submit'}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default CustomForm;
