import React from 'react';
import LoginForm from '../../components/Forms/loginForm';
import FrontPage from '../../components/Cards/frontPage';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropagateLoader from 'react-spinners/PropagateLoader';

const Login = () => {
	const user = useSelector((state) => state.user);
	const account = useSelector((state) => state.acc);
	const org = useSelector((state) => state.org);

	// console.log(account.pk);

	let redirect = null;

	if (user.token && account.details.pk) {
		redirect = <Redirect to='/home' />;
	}

	if (user.token && account.details.pk === null) {
		if (user.user.is_superuser) {
			redirect = <Redirect to='/home' />;
		} else {
			redirect = <Redirect to='/org' />;
		}
	}

	return (
		<FrontPage>
			<LoginForm />
			{user.error ? <p className='py-2 text-danger'>{user.error}</p> : ''}
			{!account.loading && redirect ? redirect : ''}

			<div className='d-flex justify-content-center mt-3'>
				<PropagateLoader
					size={15}
					color={"#2e74ff"}
					loading={user.loading && org.loading && account.loading}
					// loading={true}
				/>
			</div>
		</FrontPage>
	);
};

export default Login;
