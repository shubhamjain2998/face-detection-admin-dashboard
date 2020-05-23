import * as actionTypes from './actionTypes';

export const setUser = (authData) => {
	return {
		type: actionTypes.ADD_USER,
		authData: authData,
	};
};

export const setToken = (token) => {
	return {
		type: actionTypes.SET_TOKEN,
		token: token,
	};
};

export const deleteToken = () => {
	return {
		type: actionTypes.REMOVE_TOKEN,
	};
};
