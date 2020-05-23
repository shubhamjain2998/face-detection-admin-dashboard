import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../../axios-faceDet';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

const LoginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid Email').required('Required'),
	password: Yup.string().required('Required'),
});

const RegisterSchema = Yup.object().shape({
	email: Yup.string().email('Invalid Email').required('Required'),
	password: Yup.string().required('Required'),
	repeatPassword: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Passwords must match'
	),
});

const LoginForm = (props) => {
	const onSubmitHandler = (values) => {
		console.log(values);
		const formData = new FormData();
		formData['email'] = values.email;
		formData['password'] = values.password;
		console.log(formData);
		axios
			.post('/attendance/api/user/register', {
				email: values.email,
				password: values.password,
			})
			.then((res) => {
				console.log(res);
				props.setUser({email: res.data.email, token: null});
			})
			.catch((err) => console.log(err.message));
	};

	const loginInitial = {
		email: '',
		password: '',
	};

	const RegisterInitial = {
		email: '',
		password: '',
		repeatPassword: '',
	};

	return (
		<div className='d-flex align-items-center flex-column'>
			<h5 className='my-0'>{props.register ? 'Register' : 'Login'}</h5>
			<p className='text-secondary'>Access to our Dashboard</p>

			<Formik
				initialValues={props.register ? RegisterInitial : loginInitial}
				validationSchema={props.register ? RegisterSchema : LoginSchema}
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
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								name='email'
								type='email'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								isValid={touched.email && !errors.email}
								isInvalid={touched.email && errors.email}
							></Form.Control>
							<Form.Control.Feedback type='invalid'>
								{errors.email}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control
								name='password'
								type='password'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								isValid={touched.password && !errors.password}
								isInvalid={touched.password && errors.password}
							></Form.Control>
							<Form.Control.Feedback type='invalid'>
								{errors.password}
							</Form.Control.Feedback>
						</Form.Group>

						{props.register && (
							<Form.Group>
								<Form.Label>Repeat Password</Form.Label>
								<Form.Control
									name='repeatPassword'
									type='password'
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.repeatPassword}
									isValid={touched.repeatPassword && !errors.repeatPassword}
									isInvalid={touched.repeatPassword && errors.repeatPassword}
								></Form.Control>
								<Form.Control.Feedback type='invalid'>
									{errors.repeatPassword}
								</Form.Control.Feedback>
							</Form.Group>
						)}

						<Button
							variant='primary'
							type='submit'
							disabled={isSubmitting || !isValid}
							className='w-100'
						>
							{props.register ? 'Register' : 'login'}
						</Button>
					</Form>
				)}
			</Formik>
			<div className='pt-2'>
				{props.register ? (
					<p className='font-weight-light py-2'>
						Already have an account?{' '}
						<span className='text-primary'>
							<Link to='/login'>Login</Link>
						</span>
					</p>
				) : (
					<p className='font-weight-light py-2'>
						Don't have an account yet?{' '}
						<span className='text-primary'>
							<Link to='register'>Register</Link>
						</span>
					</p>
				)}
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		setUser: (authData) =>
			dispatch({ type: actionTypes.ADD_USER, authData: authData }),
	};
};

export default connect(null, mapDispatchToProps)(LoginForm);
