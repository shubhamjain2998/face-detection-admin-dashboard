import React from 'react';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Login from './pages/login';
import Register from './pages/register';
import Clients from './pages/clients';
import Dashboard from './pages/dashboard';
import Admin from './pages/admin';
import Profile from './pages/profile';
import Employee from './pages/employee';
import OrgRegister from './pages/orgRegister';

const App = () => {
	return (
		<div>
			<Admin>
				<AnimatedSwitch
					atEnter={{ opacity: 0 }}
					atLeave={{ opacity: 0 }}
					atActive={{ opacity: 1 }}
					className='switch-wrapper'
				>
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/account' component={Register} />
					<Route path='/org' component={OrgRegister} />
					<Route path='/client' component={Clients} />
					<Route path='/profile' component={Profile} />
					<Route path='/employee' component={Employee} />
					<Route path='/' exact component={Dashboard} />
				</AnimatedSwitch>
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
// !DONE: Navigation Bar
// !DONE: SideBar
// !DONE: Clients Table
// !DONE: Profile Page
//TODO: Employee Page
//TODO: Users Page
//TODO: Attendance Table Admin
//TODO: Attendance Table Employee
//TODO: Department Page
//TODO: Designation Page
//TODO: Dashboard
