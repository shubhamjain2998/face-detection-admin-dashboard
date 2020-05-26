import React from 'react';
import LoginForm from '../../components/Forms/loginForm';
import FrontPage from '../../components/Cards/frontPage';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Login = () => {
	const user = useSelector((state) => state.user);
	const account = useSelector((state) => state.acc.details);

	// console.log(account.pk);

	let redirect = null;

	if (user.token && account.pk) {
		redirect = <Redirect to='/' />;
	}

	if (user.token && account.pk === null) {
		if (user.user.is_superuser) {
			redirect = <Redirect to='/' />;
		} else {
			redirect = <Redirect to='/org' />;
		}
	}

	return (
		<FrontPage>
			<LoginForm />
			{user.error ? <p className='py-2 text-danger'>{user.error.message}</p> : ''}
			{redirect ? redirect : ''}
		</FrontPage>
	);
};

export default Login;
