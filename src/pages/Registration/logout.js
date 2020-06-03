import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';

const Logout = () => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.user.token);

	if (token) {
		dispatch(actions.logout());
	} else {
		return <Redirect to='/' />;
	}

	return <></>;
};

export default Logout;
