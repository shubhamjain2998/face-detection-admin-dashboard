import * as actionTypes from './actionTypes';
import axios from '../../axios-faceDet';
import { user, accounts, organization } from '../reducers/utility';

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
		data: details,
	};
};

export const loginFailed = (error) => {
	return {
		type: actionTypes.LOGIN_FAILED,
		error: error,
	};
};

export const removeUser = () => {
	return {
		type: actionTypes.REMOVE_USER,
		data: user,
	};
};

export const setAccount = (accountDetails) => {
	return {
		type: actionTypes.SET_ACCOUNT_DETAILS,
		data: accountDetails,
	};
};

export const removeAccount = () => {
	return {
		type: actionTypes.REMOVE_ACCOUNT_DETAILS,
		data: accounts,
	};
};

export const setOrg = (orgDetails) => {
	return {
		type: actionTypes.SET_ORGANIZATION_DETAILS,
		data: orgDetails,
	};
};

export const removeOrg = () => {
	return {
		type: actionTypes.REMOVE_ORGANIZATION_DETAILS,
		data: organization,
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
				dispatch(registerUserFailed(err));
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
				axios
					.get('/attendance/api/accounts/filter?email=' + res.data.user.email)
					.then((res) => {
						if (res.data.length > 0) {
							dispatch(setAccount(res.data[0]));
							axios
								.get('/attendance/api/org/' + res.data[0].orgId + '/')
								.then((res) => {
									dispatch(setOrg(res.data));
								})
								.catch((err) => {
									console.log(err.message);
									dispatch(loginFailed(err));
								});
						} else {
							dispatch(setAccount(accounts.details));
							dispatch(setOrg(organization.details));
						}
					})
					.catch((err) => {
						console.log(err.message);
						dispatch(loginFailed(err));
					});
			})
			.catch((err) => {
				console.log(err.message);
				dispatch(loginFailed(err));
			});
	};
};

export const logout = () => {
	return (dispatch) => {
		dispatch(removeUser());
		dispatch(removeAccount());
		dispatch(removeOrg());
	};
};
