import React from 'react';
import LoginForm from '../../components/Forms/loginForm';
import FrontPage from '../../components/Cards/frontPage';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Register = () => {
	const user = useSelector((state) => state.user);

	// console.log(account.pk);

	if (!user.error && !user.loading && user.user.pk) {
		return <Redirect to='/' />;
	}

	return (
		<FrontPage>
			<LoginForm register />
		</FrontPage>
	);
};

export default Register;
