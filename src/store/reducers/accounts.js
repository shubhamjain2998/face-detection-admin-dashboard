import * as actionTypes from '../actions/actionTypes';
import { updateObject, accounts } from './utility';

const acc = {
	error: null,
	loading: false,
	details: {
		pk: null,
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
		addAtt: false,
		readDept: false,
		addDept: false,
		idType: null,
		idProof: null,
		profileImg: null,
		orgId: null,
		deptId: null,
		role: null,
	},
	list: [],
	department: [],
};

let updatedDetails = {};

const accReducer = (state = acc, action) => {
	switch (action.type) {
		case actionTypes.LOGIN_STARTED:
			return updateObject(state, { loading: true });

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

		case actionTypes.SET_ACCOUNT_DETAILS:
			updatedDetails = updateObject(state.details, action.data);
			return updateObject(state, {
				error: null,
				loading: false,
				details: updatedDetails,
			});

		case actionTypes.SET_ACCOUNTS:
			return updateObject(state, { list: action.data });

		case actionTypes.REMOVE_ACCOUNT_DETAILS:
			updatedDetails = updateObject(state.details, accounts.details);
			return updateObject(state, accounts);

		case actionTypes.FETCH_DEPARTMENTS:
			return updateObject(state, { department: action.data });

		default:
			return state;
	}
};

export default accReducer;
