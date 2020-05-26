import * as actionTypes from '../actions/actionTypes';
import { updateObject, organization } from './utility';

const org = {
	error: null,
	loading: false,
	details: {
		url: '',
		pk: null,
		Name: null,
		orgType: null,
		contact: null,
		staffcount: null,
		logo: 'null',
	},
	currentOrg: {
		url: '',
		pk: null,
		Name: null,
		orgType: null,
		contact: null,
		staffcount: null,
		logo: 'null',
	},
	list: [],
};

let newDetails = {};

const orgReducer = (state = org, action) => {
	switch (action.type) {
		case actionTypes.ORGANIZATION_CREATION_STARTED:
			return updateObject(state, { loading: true });

		case actionTypes.ORGANIZATION_CREATION_COMPLETED:
			newDetails = updateObject(state.details, action.data);
			return updateObject(state, {
				error: null,
				loading: false,
				details: newDetails,
			});

		case actionTypes.ORGANIZATION_CREATION_FAILED:
			return updateObject(state, { error: action.error, loading: false });

		case actionTypes.SET_ORGANIZATION_DETAILS:
			newDetails = updateObject(state.details, action.data);
			return updateObject(state, {
				error: null,
				loading: false,
				details: newDetails,
			});

		case actionTypes.REMOVE_ORGANIZATION_DETAILS:
			return updateObject(state, organization);

		case actionTypes.SET_CURRENT_ORG:
			newDetails = updateObject(state.details, action.data);
			return updateObject(state, { currentOrg: newDetails });

		case actionTypes.FETCH_ORGANIZATIONS:
			return updateObject(state, { list: action.data });

		default:
			return state;
	}
};

export default orgReducer;
