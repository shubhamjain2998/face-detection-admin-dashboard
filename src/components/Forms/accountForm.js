import React from 'react';
import CustomForm from './customForm';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import axios from '../../axios-faceDet';

const FILE_SIZE = 10485760;

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const accountSchema = Yup.object().shape({
	firstName: Yup.string().required('Required'),
	lastName: Yup.string().required('Required'),
	username: Yup.string().required('Required'),
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

const AccountForm = (props) => {
	const formElements = [
		{
			name: 'firstName',
			type: 'text',
			value: props.values ? props.values.firstName : '',
			placeholder: 'First Name',
		},
		{
			name: 'lastName',
			type: 'text',
			value: props.values ? props.values.lastName : '',
			placeholder: 'Last Name',
		},
		{
			name: 'username',
			type: 'text',
			value: props.values ? props.values.username : '',
			placeholder: 'Username',
			helpText: 'Username should be unique',
		},
		{
			name: 'phone',
			type: 'number',
			value: props.values ? props.values.phone : '',
			placeholder: 'Alternate Mobile Number',
		},

		{
			name: 'gender',
			type: 'select',
			value: props.values ? props.values.gender : '',
			options: ['Gender', 'Male', 'Female'],
		},
		{
			name: 'idType',
			type: 'select',
			value: props.values ? props.values.idType : '',
			options: ['ID Type', 'Passport'],
		},
		{
			name: 'idProof',
			type: 'text',
			value: props.values ? props.values.idProof : '',
			placeholder: 'ID Proof',
			col: '12',
			helpText: 'ID Proof should be unique',
		},
		{ name: 'profileImg', type: 'file', value: '', label: 'Profile Photo' },

		{
			name: 'readEmp',
			type: 'checkbox',
			value: props.values ? props.values.readEmp : '',
			label: 'Read Employee',
		},
		{
			name: 'writeEmp',
			type: 'checkbox',
			value: props.values ? props.values.addEmp : '',
			label: 'Write Employee',
		},
		{
			name: 'readAtt',
			type: 'checkbox',
			value: props.values ? props.values.readAtt : '',
			label: 'Read Attendance',
		},
		{
			name: 'writeAtt',
			type: 'checkbox',
			value: props.values ? props.values.addAtt : '',
			label: 'Write Attendance',
		},
		{
			name: 'readDept',
			type: 'checkbox',
			value: props.values ? props.values.readDept : '',
			label: 'Read Department',
		},
		{
			name: 'writeDept',
			type: 'checkbox',
			value: props.values ? props.values.addDept : '',
			label: 'Write Department',
		},
	];

	const dispatch = useDispatch();
	const account = useSelector((state) => state.acc);

	const user = useSelector((state) => state.user);
	const org = useSelector((state) => state.org);

	const onSubmitHandler = (values) => {
		if (!props.edit && !props.add) {
			// console.log(values);
			dispatch(actions.accountCreation(values, user, org));
		} else {
			var empData = new FormData();
			// console.log(props.values);
			// console.log(values);
			empData.append('empId', props.values.empId);
			empData.append('emailId', props.values.emailId);
			empData.append('username', values.username);
			empData.append('firstName', values.firstName);
			empData.append('lastName', values.lastName);
			empData.append('gender', values.gender);
			empData.append('phone', values.phone);
			empData.append('readEmp', values.readEmp);
			empData.append('addEmp', values.writeEmp);
			empData.append('readAtt', values.readAtt);
			empData.append('addAtt', values.writeAtt);
			empData.append('readDept', values.readDept);
			empData.append('addDept', values.writeDept);
			empData.append('idType', values.idType);
			empData.append('idProof', values.idProof);
			empData.append('profileImg', values.profileImg);
			empData.append('orgId', props.values.orgId);
			empData.append('deptId', '1');
			empData.append('role', 'client');

			// console.log(empData.entries);

			if (props.edit) {
				axios
					.put('/attendance/api/accounts/' + props.values.empId + '/', empData)
					.then((res) => {
						// console.log(res.data);
						props.onEditingDone(res.data);
					})
					.catch((err) => console.log(err));
			} else {
				axios
					.post('/attendance/api/accounts', empData)
					.then((res) => {
						console.log(res.data);
						props.onEditingDone(res.data);
					})
					.catch((err) => console.log(err));
			}
		}
	};

	if (!props.edit && account.details.pk && !account.loading && !account.error) {
		return <Redirect to='/' />;
	}

	return (
		<div className='d-flex align-items-center flex-column'>
			{props.edit ? '' : <h5 className='my-0'>Register Your Account</h5>}
			<CustomForm
				elements={formElements}
				validationSchema={accountSchema}
				handleSubmit={onSubmitHandler}
			/>
			{account.error ? (
				<p className='py-2 text-danger'>{account.error.message}</p>
			) : (
				''
			)}
		</div>
	);
};

export default AccountForm;
