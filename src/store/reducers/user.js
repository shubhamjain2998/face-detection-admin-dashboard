import * as actionTypes from '../actions/actionTypes';
import { updateObject, user } from './utility';

const initialState = {
	error: null,
	token: null,
	loading: false,
	user: {
		pk: null,
		email: null,
		is_superuser: false,
	},
};

let newUser = {};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.REGISTRATION_STARTED:
			return updateObject(state, { loading: true });

		case actionTypes.REGISTRATION_COMPLETED:
			newUser = {
				pk: action.authData.id,
				email: action.authData.email,
				is_superuser: false,
			};

			return updateObject(state, {
				error: null,
				token: null,
				user: newUser,
				loading: false,
			});

		case actionTypes.REGISTRATION_FAILED:
			return updateObject(state, { error: action.error, loading: true });

		case actionTypes.LOGIN_STARTED:
			return updateObject(state, { loading: true });

		case actionTypes.LOGIN_COMPLETED:
			newUser = updateObject(state.user, {
				pk: action.data.id,
				email: action.data.email,
				is_superuser: action.data.is_superuser,
			});
			return updateObject(state, {
				error: null,
				token: action.token,
				loading: false,
				user: newUser,
			});

		case actionTypes.LOGIN_FAILED:
			return updateObject(state, { error: action.error, loading: false });

		case actionTypes.REMOVE_USER:
			return updateObject(state, user);

		default:
			return state;
	}
};

export default userReducer;
