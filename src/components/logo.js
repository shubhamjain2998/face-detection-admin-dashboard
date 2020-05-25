import React from 'react';
import { Image } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';

const Logo = () => {
	const orgLogo = useSelector((state) => state.org.details.logo);
	return (
		<div>
			<Image src={orgLogo ? orgLogo : logo} alt='' fluid />
		</div>
	);
};

export default Logo;
