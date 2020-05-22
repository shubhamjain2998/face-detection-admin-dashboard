import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Clients from './pages/clients';
import Dashboard from './pages/dashboard';
import Admin from './pages/admin';

const App = () => {
	return (
		<div>
			<Admin>
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/client' component={Clients} />
					<Route path='/' exact component={Dashboard} />
				</Switch>
			</Admin>
		</div>
	);
};

export default App;

// * 21 May
//------------------------------------------------------------------------
// !DONE: Clients Page
// !DONE: Login Page
// !DONE: Register Page
// !DONE: OTP Page
// !DONE: Generalized Form
// !DONE: Generalized Modal
// !DONE: Generalized Heading
// !DONE: Routing
//----------------------------------------------------------------------------
// * 22 May
//----------------------------------------------------------------------------
// !Done: Navigation Bar
// !Done: SideBar
// !Done: Clients Table
//TODO: Profile Page
//TODO: Employee Page
//TODO: Users Page
//TODO: Attendance Table Admin
//TODO: Attendance Table Employee
//TODO: Department Page
//TODO: Dashboard





