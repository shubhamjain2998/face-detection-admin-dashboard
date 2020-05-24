import React from 'react';
import CustomForm from './customForm';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';

const FILE_SIZE = 10485760;

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const accountSchema = Yup.object().shape({
	firstName: Yup.string().required('Required'),
	lastName: Yup.string().required('Required'),
	username: Yup.string().required('Required'),
	role: Yup.string().required('Required'),
	idProof: Yup.string().required('Required'),
	readEmp: Yup.string().required('Required'),
	writeEmp: Yup.string().required('Required'),
	readAtt: Yup.string().required('Required'),
	writeAtt: Yup.string().required('Required'),
	readDept: Yup.string().required('Required'),
	writeDept: Yup.string().required('Required'),
	gender: Yup.string().required('Required'),
	idType: Yup.string().required('Required'),

	phone: Yup.number().min(10, 'Invalid Number!').required('Required'),

	profileImg: Yup.mixed()
		.required('A file is required')
		.test(
			'fileSize',
			'File too large',
			(value) => value && value.size <= FILE_SIZE
		)
		.test(
			'fileFormat',
			'Unsupported Format',
			(value) => value && SUPPORTED_FORMATS.includes(value.type)
		),
});

const formElements = [
	{ name: 'firstName', type: 'text', value: '', placeholder: 'First Name' },
	{ name: 'lastName', type: 'text', value: '', placeholder: 'Last Name' },
	{ name: 'username', type: 'text', value: '', placeholder: 'Username' },
	{ name: 'phone', type: 'number', value: '', placeholder: 'Mobile Number' },
	{ name: 'role', type: 'text', value: '', placeholder: 'Role' },

	{
		name: 'gender',
		type: 'select',
		value: '',
		options: ['Gender', 'Male', 'Female'],
	},
	{
		name: 'idType',
		type: 'select',
		value: '',
		options: ['ID Type', 'Passport'],
	},
	{ name: 'idProof', type: 'text', value: '', placeholder: 'ID Proof' },
	{ name: 'profileImg', type: 'file', value: '', label: 'Profile Photo' },

	{ name: 'readEmp', type: 'checkbox', value: false, label: 'Read Employee' },
	{
		name: 'writeEmp',
		type: 'checkbox',
		value: false,
		label: 'Write Employee',
	},
	{
		name: 'readAtt',
		type: 'checkbox',
		value: false,
		label: 'Read Attendance',
	},
	{
		name: 'writeAtt',
		type: 'checkbox',
		value: false,
		label: 'Write Attendance',
	},
	{
		name: 'readDept',
		type: 'checkbox',
		value: false,
		label: 'Read Department',
	},
	{
		name: 'writeDept',
		type: 'checkbox',
		value: false,
		label: 'Write Department',
	},
];

const AccountForm = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const org = useSelector((state) => state.org);

	const onSubmitHandler = (values) => {
		console.log(values);
		dispatch(actions.accountCreation(values, user, org));
	};

	return (
		<div className='d-flex align-items-center flex-column'>
			<h5 className='my-0'>Register Your Account</h5>
			<CustomForm
				elements={formElements}
				validationSchema={accountSchema}
				handleSubmit={onSubmitHandler}
			/>
		</div>
	);
};

export default AccountForm;
