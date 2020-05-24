import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility';

const organization = {
	error: null,
	loading: false,
	details: {
		url: '',
		pk: null,
		name: null,
		orgType: null,
		contact: null,
		staffCount: null,
		logo: 'null',
	},
};

const orgReducer = (state = organization, action) => {
	switch (action.type) {
		case actionTypes.ORGANIZATION_CREATION_STARTED:
			return updateObject(state, { loading: true });

		case actionTypes.ORGANIZATION_CREATION_COMPLETED:
			const newDetails = updateObject(state.details, action.data);
			return updateObject(state, {
				error: null,
				loading: false,
				details: newDetails,
			});

		case actionTypes.ORGANIZATION_CREATION_FAILED:
			return updateObject(state, { error: action.error, loading: false });

		default:
			return state;
	}
};

export default orgReducer;
