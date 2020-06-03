import React from 'react';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Login from './pages/Registration/login';
import Register from './pages/Registration/register';
import Clients from './pages/clients';
import Dashboard from './pages/dashboard';
import Admin from './pages/admin';
import Profile from './pages/profile';
import Employee from './pages/employee';
import OrgRegister from './pages/Registration/orgRegister';
import AccRegister from './pages/Registration/accRegister';
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
				<AnimatedSwitch
					atEnter={{ opacity: 0 }}
					atLeave={{ opacity: 0 }}
					atActive={{ opacity: 1 }}
					className='switch-wrapper'
				>
					<Route path='/login' component={Login} />
					<Route path='/logout' component={Logout} />
					<Route path='/register' component={Register} />
					<Route path='/' exact component={Home} />
					<PrivateRoute path='/account' component={AccRegister} />
					<PrivateRoute path='/org' component={OrgRegister} />
					<PrivateRoute path='/client' component={Clients} />
					<PrivateRoute path='/profile' component={Profile} />
					<PrivateRoute path='/employee' component={Employee} />
					<PrivateRoute path='/dept' component={Department} />
					<PrivateRoute path='/user' component={Users} />
					<PrivateRoute path='/attAdmin' component={AttendanceAdmin} />
					<PrivateRoute path='/home' exact component={Dashboard} />
					{/* <PrivateRoute path='/' exact component={Login} /> */}
					
				</AnimatedSwitch>
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

// *CONFUSION: Step 1 - Delete Functionality for User Page
// !DONE: Step 2 - Departments DropDown Implementation
// !DONE: Step 3 - Uploading Images Functionality
// !*PARTIAL DONE: Step 4 - Attendance Page Functionality For Admin
//TODO: Step 5 - Attendance Page Functionality For Employee
//TODO: Step 6 - Implementation Of the Attendance App