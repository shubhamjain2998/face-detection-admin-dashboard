import * as actionTypes from './actionTypes';
import axios from '../../axios-faceDet';

export const registerUserStarted = () => {
	return {
		type: actionTypes.REGISTRATION_STARTED,
	};
};

export const registerUserCompleted = (authData) => {
	return {
		type: actionTypes.REGISTRATION_COMPLETED,
		authData: authData,
	};
};

export const registerUserFailed = (error) => {
	return {
		type: actionTypes.REGISTRATION_FAILED,
		error: error,
	};
};

export const loginStarted = () => {
	return {
		type: actionTypes.LOGIN_STARTED,
	};
};

export const loginCompleted = (token, details) => {
	return {
		type: actionTypes.LOGIN_COMPLETED,
		token: token,
		data: details
	};
};

export const loginFailed = (error) => {
	return {
		type: actionTypes.LOGIN_FAILED,
		error: error,
	};
};

export const logout = () => {
	return {
		type: actionTypes.LOGOUT,
	};
};

export const registerUser = (userDetails) => {
	return (dispatch) => {
		dispatch(registerUserStarted());
		axios
			.post('/attendance/api/user/register', {
				email: userDetails.email,
				password: userDetails.password,
			})
			.then((res) => {
				console.log(res);
				dispatch(registerUserCompleted(res.data));
			})
			.catch((err) => {
				console.log(err.message);
				dispatch(registerUserFailed(err))
			});
	};
};

export const loginUser = (userDetails) => {
	return (dispatch) => {
		dispatch(loginStarted());
		axios
			.post('/attendance/auth/login/', {
				email: userDetails.email,
				password: userDetails.password,
			})
			.then((res) => {
				console.log(res);
				dispatch(loginCompleted(res.data.token, res.data.user));
			})
			.catch((err) => {
				console.log(err.message);
				dispatch(loginFailed(err))
			});
	};
};


