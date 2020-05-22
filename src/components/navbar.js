import React from 'react';
import {
	Navbar,
	Form,
	FormControl,
	Button,
	Image,
	NavDropdown,
} from 'react-bootstrap';
import logo from '../assets/logo.png';
import { RiBarChartHorizontalLine, RiSearch2Line } from 'react-icons/ri';
import { AiOutlineMenu } from 'react-icons/ai';

const DashboardNavbar = (props) => {
	return (
		<React.Fragment>
			<Navbar className='customNav' variant='light' fixed="top">
				<div className='navMenuIcon' onClick={props.showSidebar}>
					<AiOutlineMenu />
				</div>
				<div className='d-flex justify-content-center navLogo'>
					<div className='d-flex justify-content-center'>
						<Image src={logo} alt='' style={{ maxWidth: '35%' }} />
					</div>
				</div>

				<div className='mr-auto navBrandName'>
					<span style={{ cursor: 'pointer' }} onClick={props.showSidebar}>
						<RiBarChartHorizontalLine />
					</span>
					<p className='my-0 px-3'>Dreamguy's Technologies</p>
				</div>
				<Form inline className='navForm'>
					<FormControl
						type='text'
						placeholder='Search here'
						className='bg-transparent navSearch'
					></FormControl>
					<Button type='submit' variant='transparent'>
						<RiSearch2Line />
					</Button>
				</Form>
				<div>
					<NavDropdown title='Admin' className='navDropdown'>
						<NavDropdown.Item>My Profile</NavDropdown.Item>
						<NavDropdown.Item>Settings</NavDropdown.Item>
						<NavDropdown.Item>Log Out</NavDropdown.Item>
					</NavDropdown>
				</div>
			</Navbar>
		</React.Fragment>
	);
};

export default DashboardNavbar;
