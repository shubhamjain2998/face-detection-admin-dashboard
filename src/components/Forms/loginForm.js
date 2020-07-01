import React, { useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

const LoginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid Email').required('Required'),
	password: Yup.string().required('Required'),
});

const RegisterSchema = Yup.object().shape({
	email: Yup.string().email('Invalid Email').required('Required'),
	password: Yup.string()
		.min(8, 'Password should contain more than 8 characters')
		.required('Required'),
	repeatPassword: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Passwords must match'
	),
});

const LoginForm = (props) => {
	const dispatch = useDispatch();

	const loginRef = useRef(null);

	// useEffect(() => {
	// 	loginRef.current.focus();
	// }, []);

	const onSubmitHandler = (values) => {
		// console.log(values);
		dispatch(actions.fetchDept());
		if (props.register) {
			dispatch(actions.registerUser(values));
		} else {
			dispatch(actions.loginUser(values));
		}
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
			<h5 className='login-heading w-100'>
				{props.register ? '' : 'Sign in to your account'}
			</h5>
			{/* <p className='text-secondary'>Access to our Dashboard</p> */}

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
					<Form noValidate onSubmit={handleSubmit} className='w-100 mt-2 login-form'>
						<Form.Group>
							<Form.Label>Email</Form.Label>
							<Form.Control
								name='email'
								ref={loginRef}
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
							variant='primary mt-4 py-2'
							type='submit'
							disabled={!isValid}
							className='w-50'
						>
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default LoginForm;
