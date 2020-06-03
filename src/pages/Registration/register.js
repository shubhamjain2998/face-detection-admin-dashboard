import React from 'react';
import LoginForm from '../../components/Forms/loginForm';
import FrontPage from '../../components/Cards/frontPage';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropagateLoader from 'react-spinners/PropagateLoader'

const Register = () => {
	const user = useSelector((state) => state.user);
	const account = useSelector((state) => state.acc);
	const org = useSelector((state) => state.org);

	// console.log(account.pk);

	if (!user.error && !user.loading && user.user.pk) {
		return <Redirect to='/home' />;
	}

	return (
		<>
			<LoginForm register />
			<div className='d-flex justify-content-center mt-3'>
				<PropagateLoader
					size={15}
					color={'#2e74ff'}
					loading={user.loading && org.loading && account.loading}
					// loading={true}
				/>
			</div>
		</>
	);
};

export default Register;
