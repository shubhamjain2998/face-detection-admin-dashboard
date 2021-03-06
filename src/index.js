import React from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './customBS.scss';
// import './index.css';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import userReducer from './store/reducers/user';
import thunk from 'redux-thunk';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import orgReducer from './store/reducers/org';
import accReducer from './store/reducers/accounts';
import * as actions from './store/actions/index';
import swReducer from './store/reducers/serviceWorker';
import TestPayment from './components/testPayment';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	user: userReducer,
	org: orgReducer,
	acc: accReducer,
	sw: swReducer,
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<React.StrictMode>
				<App />
				{/* <TestPayment /> */}
			</React.StrictMode>
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
	onSuccess: () => store.dispatch(actions.serviceWorkerInit()),
	onUpdate: (reg) => store.dispatch(actions.serviceWorkerUpdate(reg)),
});
