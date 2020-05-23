import * as actionTypes from './actionTypes';

export const accountCreationStarted = () => {
	return {
		type: actionTypes.ACCOUNT_CREATION_STARTED,
	};
};

export const accountCreationCompleted = (accountDetails) => {
	return {
		type: actionTypes.ACCOUNT_CREATION_COMPLETED,
		data: accountDetails,
	};
};

export const accountCreationFailed = (error) => {
	return {
		type: actionTypes.ACCOUNT_CREATION_FAILED,
		error: error,
	};
};

export const accountCreation = (accountDetails) => {
	return (dispatch) => {
        dispatch(accountCreationStarted());
	};
};
