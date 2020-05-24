import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility';

const accounts = {
	error: null,
	loading: false,
	details: {
		empId: null,
		emailId: null,
		username: null,
		firstName: null,
		lastName: null,
		gender: null,
		phone: null,
		readEmp: false,
		addEmp: false,
		readAtt: false,
		writeAtt: false,
		readDept: false,
		addDept: false,
		idType: null,
		idProof: null,
		profileImg: null,
		orgId: null,
		deptId: null,
		role: null,
	},
};

const accReducer = (state = accounts, action) => {
	switch (action.type) {
		case actionTypes.ACCOUNT_CREATION_STARTED:
			return updateObject(state, { loading: true });

		case actionTypes.ACCOUNT_CREATION_COMPLETED:
			return updateObject(state, {
				error: null,
				loading: false,
				details: action.data,
			});

		case actionTypes.ACCOUNT_CREATION_FAILED:
			return updateObject(state, { error: action.error });

		default:
			return state;
	}
};

export default accReducer;
