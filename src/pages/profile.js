import React from 'react'
import Heading from '../components/heading';
import ProfileCard from '../components/Cards/profileCard';

const Profile = () => {

    return (
        <div>
            <Heading name="Profile" link="profile" />
            <ProfileCard />
        </div>
    )
}

export default Profile;