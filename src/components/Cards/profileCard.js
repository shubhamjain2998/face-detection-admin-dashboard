import React from 'react';
import { Image, Button, Badge } from 'react-bootstrap';
import defaultImg from '../../assets/user.svg';

const ProfileCard = ({ account, org }) => {
	return (
		<div className='profile-card'>
			<Image
				src={account.profileImg ? account.profileImg : defaultImg}
				alt=''
				fluid
				roundedCircle
			/>
			<h5>{account.firstName + ' ' + account.lastName}</h5>
			<Badge pill variant='success' className='mt-2'>
				Non Premium User
			</Badge>
			<Button variant='warning' block className='w-75 my-3'>
				Send Message
			</Button>
			<div className='profile-detail'>
				<p>Email</p>
				<h6>{account.emailId}</h6>
			</div>
			<div className='profile-detail'>
				<p>Phone</p>
				<h6>{account.phone}</h6>
			</div>
			<div className='profile-detail'>
				<p>Gender</p>
				<h6>{account.gender}</h6>
			</div>
		</div>
	);
};

export default ProfileCard;
