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

export const orgCreation = (orgDetails) => {
	const orgdata = new FormData();
	orgdata.append('Name', orgDetails.name);
	orgdata.append('orgType', orgDetails.orgType);
	orgdata.append('contact', orgDetails.phone);
	orgdata.append('staffcount', orgDetails.staffCount);
	return (dispatch) => {
		dispatch(orgCreationStarted());
		console.log(orgdata);
		axios
			.post('/attendance/api/org', orgdata)
			.then((res) => {
				console.log(res);
				dispatch(orgCreationCompleted({}));
			})
			.catch((err) => {
				console.log(err);
				dispatch(orgCreationFailed(err));
			});
	};
};
