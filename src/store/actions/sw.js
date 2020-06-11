import * as actionTypes from './actionTypes';

export const serviceWorkerInit = () => {
	return {
		type: actionTypes.INITIALIZE_SERVICE_WORKER,
	};
};

export const serviceWorkerUpdate = (reg) => {
	return {
		type: actionTypes.UPDATE_SERVICE_WORKER,
		payload: reg,
	};
};
