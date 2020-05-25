import React from 'react';
import Heading from '../components/heading';
import ProfileCard from '../components/Cards/profileCard';

const Profile = (props) => {
	console.log(props.location);
	return (
		<div>
			<Heading name='Profile' link='profile' />
			<ProfileCard
				account={props.location.state.acc}
				name={props.location.state.name}
			/>
		</div>
	);
};

export default Profile;
