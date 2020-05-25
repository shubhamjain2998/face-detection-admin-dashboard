import React from 'react';
import LoginForm from '../../components/Forms/loginForm';
import FrontPage from '../../components/Cards/frontPage';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Login = () => {
	const user = useSelector((state) => state.user);
	const account = useSelector((state) => state.acc.details);

	// console.log(account.pk);

	if (user.token && account.pk) {
		return <Redirect to='/' />;
	}

	if (user.token && account.pk === null) {
		if (user.user.is_superuser) {
			return <Redirect to='/' />;
		} else {
			return <Redirect to='/org' />;
		}
	}

	return (
		<FrontPage>
			<LoginForm />
		</FrontPage>
	);
};

export default Login;
