import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility';

const initialState = {
	initialized: false,
	updated: false,
	registered: null,
};

const swReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.INITIALIZE_SERVICE_WORKER:
			return updateObject(state, { initialized: true });

		case actionTypes.UPDATE_SERVICE_WORKER:
			return updateObject(state, { updated: true, registered: action.payload });

		default:
			return state;
	}
};

export default swReducer;
