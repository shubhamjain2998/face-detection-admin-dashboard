import React from 'react';
import LoginForm from '../../components/Forms/loginForm';
import { useSelector } from 'react-redux';
import PropagateLoader from 'react-spinners/PropagateLoader';

const Login = () => {
	const user = useSelector((state) => state.user);
	const account = useSelector((state) => state.acc);
	const org = useSelector((state) => state.org);

	return (
		<>
			<LoginForm />
			{user.error ? <p className='py-2 text-danger text-capitalize'>{user.error}</p> : ''}
			<div className='d-flex justify-content-center py-2 my-3'>
				<PropagateLoader
					size={10}
					color={"#654aa1"}
					loading={user.loading && org.loading && account.loading}
					// loading={true}
				/>
			</div>
		</>
	);
};

export default Login;
