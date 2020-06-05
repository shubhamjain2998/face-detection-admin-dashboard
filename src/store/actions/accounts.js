import * as actionTypes from './actionTypes';
import axios from '../../axios-faceDet';

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

export const setDepartment = (departments) => {
	return {
		type: actionTypes.FETCH_DEPARTMENTS,
		data: departments,
	};
};

export const setAccounts = (Accounts) => {
	return {
		type: actionTypes.SET_ACCOUNTS,
		data: Accounts,
	};
};

export const fetchDept = () => {
	return (dispatch) => {
		axios
			.get('/attendance/api/dept')
			.then((res) => {
				dispatch(setDepartment(res.data));
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};
};

export const accountCreation = (accountDetails, user, org) => {
	const formData = new FormData();
	formData.append('empId', org.details.pk + user.user.pk);
	formData.append('emailId', user.user.email);
	formData.append('username', accountDetails.username);
	formData.append('firstName', accountDetails.firstName);
	formData.append('lastName', accountDetails.lastName);
	formData.append('gender', accountDetails.gender);
	formData.append('phone', accountDetails.phone);
	formData.append('readEmp', true);
	formData.append('addEmp', true);
	formData.append('readAtt', true);
	formData.append('addAtt', true);
	formData.append('readDept', true);
	formData.append('addDept', true);
	formData.append('idType', accountDetails.idType);
	formData.append('idProof', accountDetails.idProof);
	formData.append('profileImg', accountDetails.profileImg);
	formData.append('orgId', org.details.pk);
	formData.append('deptId', '1');
	formData.append('role', 'client');

	return (dispatch) => {
		dispatch(accountCreationStarted());

		axios
			.post('/attendance/api/accounts/register', formData)
			.then((res) => {
				console.log(res.data);
				dispatch(accountCreationCompleted(res.data));
			})
			.catch((err) => {
				console.log(err.response.data);
				dispatch(
					accountCreationFailed(err.response.data.non_field_errors.join(' '))
				);
			});
	};
};
