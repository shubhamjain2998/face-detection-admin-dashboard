import React from 'react';
import CustomForm from './customForm';

const formElements = [
	{ name: 'firstName', type: 'text', value: '', placeholder: 'First Name' },
	{ name: 'lastName', type: 'text', value: '', placeholder: 'Last Name' },
	{ name: 'username', type: 'text', value: '', placeholder: 'Username' },
	{ name: 'email', type: 'email', value: '', placeholder: 'Email ID' },
	{ name: 'password', type: 'password', value: '', placeholder: 'Password' },
	{
		name: 'confirmPassword',
		type: 'password',
		value: '',
		placeholder: 'Confirm Password',
	},
	{ name: 'clientId', type: 'number', value: '', placeholder: 'Client ID' },
	{ name: 'phone', type: 'number', value: '', placeholder: 'Mobile Number' },
	{ name: 'companyName', type: 'text', value: '', placeholder: 'Company Name' },
];

const AccountForm = () => {
	return <CustomForm elements={formElements} />;
};

export default AccountForm;
