import * as actionTypes from './actionTypes';
import axios from '../../axios-faceDet';

export const orgCreationStarted = () => {
	return {
		type: actionTypes.ORGANIZATION_CREATION_STARTED,
	};
};

export const orgCreationCompleted = (orgDetails) => {
	return {
		type: actionTypes.ORGANIZATION_CREATION_COMPLETED,
		data: orgDetails,
	};
};

export const orgCreationFailed = (error) => {
	return {
		type: actionTypes.ORGANIZATION_CREATION_FAILED,
		error: error,
	};
};

export const setCurrentOrg = (orgDetails) => {
	return {
		type: actionTypes.SET_CURRENT_ORG,
		data: orgDetails,
	};
};

export const fetchOrgs = (orgs) => {
	return {
		type: actionTypes.FETCH_ORGANIZATIONS,
		data: orgs,
	};
};

export const orgCreation = (orgDetails) => {
	const orgdata = new FormData();
	orgdata.append('Name', orgDetails.name);
	orgdata.append('orgType', orgDetails.orgType);
	orgdata.append('contact', orgDetails.phone);
	orgdata.append('staffcount', orgDetails.staffCount);
	orgdata.append('logo', orgDetails.logo); //TODO: change logo name here
	return (dispatch) => {
		dispatch(orgCreationStarted());
		console.log(orgdata);

		//TODO: Add Token Authentication

		axios
			.post('/attendance/api/org', orgdata)
			.then((res) => {
				console.log(res.data);
				dispatch(orgCreationCompleted(res.data));
			})
			.catch((err) => {
				console.log(err.response.data);
				dispatch(orgCreationFailed(err.response.data.non_field_errors.join(' ')));
			});
	};
};
