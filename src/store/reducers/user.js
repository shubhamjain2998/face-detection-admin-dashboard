import * as actionTypes from '../actions/actionTypes';

const initialState = {
	email: null,
	token: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_USER:
			const newState = {
				email: action.authData.email,
				token: null,
			};
			return {
				...initialState,
				newState,
			};

		case actionTypes.SET_TOKEN:
			return {
				...initialState,
				token: action.token,
			};

		case actionTypes.REMOVE_TOKEN:
			const updatedState = {
				email: null,
				token: null,
			};

			return {
				...initialState,
				updatedState,
			};

		default:
			return state;
	}
};

export default userReducer;
