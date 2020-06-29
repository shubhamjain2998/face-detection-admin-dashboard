import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Clients from './pages/clients';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import Employee from './pages/employee';
import Logout from './pages/Registration/logout';
import PrivateRoute from './components/privateRoute';
import Department from './pages/department';
import Users from './pages/users';
import AttendanceAdmin from './pages/attAdmin';
import Home from './pages/testHome/testhome';
import Layout from './pages/testHome/layout';

const App = () => {
	return (
		<div>
			<Layout>
				<Switch>
					<Route path='/logout' component={Logout} />
					<PrivateRoute path='/client' component={Clients} />
					<PrivateRoute path='/profile' component={Profile} />
					<PrivateRoute path='/employee' component={Employee} />
					<PrivateRoute path='/dept' component={Department} />
					<PrivateRoute path='/user' component={Users} />
					<PrivateRoute path='/attAdmin' component={AttendanceAdmin} />
					<PrivateRoute path='/home' exact component={Dashboard} />
					<Route path='/' exact component={Home} />
					<Redirect to='/' />
				</Switch>
			</Layout>
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
// !DONE: Navigation Bar
// !DONE: SideBar
// !DONE: Clients Table
// !DONE: Profile Page
// !DONE: Employee Page

// TODO: Dashboard

// !DONE: Step 1 - Delete Functionality for User Page
// !DONE: Step 2 - Departments DropDown Implementation
// !DONE: Step 3 - Uploading Images Functionality
// !DONE: Step 4 - Attendance Page Functionality For Admin
// !DONE: Step 5 - Attendance Page Functionality For Employee
// !DONE: Step 6 - Implementation Of the Attendance App
