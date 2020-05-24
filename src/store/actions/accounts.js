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

export const accountCreation = (accountDetails, user, org) => {
	const formData = new FormData();
	formData.append('empId', org.details.pk + user.user.pk);
	formData.append('emailId', user.user.pk);
	formData.append('username', accountDetails.username);
	formData.append('firstName', accountDetails.firstName);
	formData.append('lastName', accountDetails.lastName);
	formData.append('gender', accountDetails.gender);
	formData.append('phone', accountDetails.phone);
	formData.append('readEmp', accountDetails.readEmp);
	formData.append('addEmp', accountDetails.writeEmp);
	formData.append('readAtt', accountDetails.readAtt);
	formData.append('addAtt', accountDetails.writeAtt);
	formData.append('readDept', accountDetails.readDept);
	formData.append('addDept', accountDetails.writeDept);
	formData.append('idType', accountDetails.idType);
	formData.append('idProof', accountDetails.idProof);
	formData.append('profileImg', accountDetails.profileImg);
	formData.append('orgId', org.details.pk);
	formData.append('deptId', '1');
	formData.append('role', accountDetails.role);

	return (dispatch) => {
		dispatch(accountCreationStarted());

		axios
			.post('/attendance/api/accounts/register', formData)
			.then((res) => {
				console.log(res.data);
				dispatch(accountCreationCompleted(res.data));
			})
			.catch((err) => {
				console.log(err);
				dispatch(accountCreationFailed(err));
			});
	};
};
