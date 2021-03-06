import React, { useState } from 'react';
import CustomForm from './customForm';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import axios from '../../axios-faceDet';
import { showErrors } from '../../store/reducers/utility';
import Loader from '../loader';

// const FILE_SIZE = 10485760;

// const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const RegisterSchema = Yup.object().shape({
	email: Yup.string().email('Invalid Email').required('Required'),
	password: Yup.string()
		.min(8, 'Password should contain more than 8 characters')
		.required('Required'),
	confirmPassword: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Passwords must match'
	),
});

const accountSchema = Yup.object().shape({
	firstName: Yup.string().required('Required'),
	lastName: Yup.string().required('Required'),
	username: Yup.string().required('Required'),
	idProof: Yup.string().required('Required'),
	gender: Yup.string().required('Required'),
	idType: Yup.string().required('Required'),

	phone: Yup.number().min(10, 'Invalid Number!').required('Required'),

	// profileImg: Yup.mixed()
	// 	.test(
	// 		'fileSize',
	// 		'File too large',
	// 		(value) => value && value.size <= FILE_SIZE
	// 	)
	// 	.test(
	// 		'fileFormat',
	// 		'Unsupported Format',
	// 		(value) => value && SUPPORTED_FORMATS.includes(value.type)
	// 	),
});

const AccountForm = (props) => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const account = useSelector((state) => state.acc);

	const user = useSelector((state) => state.user);
	const org = useSelector((state) => state.org);

	let modifiedSchema;

	const departments = useSelector((state) => state.acc.department);

	const formElements = [
		{
			name: 'firstName',
			type: 'text',
			value: props.values ? props.values.firstName : '',
			label: 'First Name',
		},
		{
			name: 'lastName',
			type: 'text',
			value: props.values ? props.values.lastName : '',
			label: 'Last Name',
		},
		{
			name: 'username',
			type: 'text',
			value: props.values ? props.values.username : '',
			label: 'Username',
			helpText: 'Username should be unique',
		},
		{
			name: 'phone',
			type: 'number',
			value: props.values ? props.values.phone : '',
			label: 'Personal Mobile Number',
		},

		{
			name: 'gender',
			type: 'select',
			value: props.values ? props.values.gender : '',
			options: ['', 'Male', 'Female'],
			label: 'Gender',
		},
		{
			name: 'idType',
			type: 'select',
			value: props.values ? props.values.idType : '',
			options: ['', 'Passport'],
			label: 'ID Type',
		},
		{
			name: 'idProof',
			type: 'text',
			value: props.values ? props.values.idProof : '',
			label: 'ID Proof',
			helpText: 'ID Proof should be unique',
		},
		{
			name: 'profileImg',
			type: 'file',
			value: '',
			label: 'Profile Photo',
			valid: props.values ? (props.values.profileImg ? true : false) : false,
			path: props.values ? props.values.profileImg : '',
		},
	];

	if (props.add) {
		modifiedSchema = accountSchema.concat(RegisterSchema);
		const registerElements = [
			{
				name: 'email',
				type: 'email',
				value: '',
				label: 'Enter Your Email',
				col: 12,
			},
			{ name: 'password', type: 'password', value: '', label: 'Password' },
			{
				name: 'confirmPassword',
				type: 'password',
				value: '',
				label: 'Confirm Password',
			},
		];
		formElements.unshift(...registerElements);
	}

	if (props.add || props.edit) {
		const elements = [
			{
				name: 'dept',
				type: 'select',
				value: props.values ? props.values.deptId : '',
				options: departments.map((dep) => {
					return { name: dep.DeptName, value: dep.id };
				}),
				label: 'Department',
			},
			{
				name: 'readEmp',
				type: 'checkbox',
				value: props.values ? props.values.readEmp : false,
				label: 'Read Employee',
			},
			{
				name: 'writeEmp',
				type: 'checkbox',
				value: props.values ? props.values.addEmp : false,
				label: 'Write Employee',
			},
			{
				name: 'readAtt',
				type: 'checkbox',
				value: props.values ? props.values.readAtt : false,
				label: 'Read Attendance',
			},
			{
				name: 'writeAtt',
				type: 'checkbox',
				value: props.values ? props.values.addAtt : false,
				label: 'Write Attendance',
			},
			{
				name: 'readDept',
				type: 'checkbox',
				value: props.values ? props.values.readDept : false,
				label: 'Read Department',
			},
			{
				name: 'writeDept',
				type: 'checkbox',
				value: props.values ? props.values.addDept : false,
				label: 'Write Department',
			},
		];
		formElements.splice(formElements.length - 1, 0, ...elements);
	}

	if ((props.add || props.edit) && user.user.is_superuser) {
		const roleElement = {
			name: 'role',
			type: 'select',
			value: props.values ? props.values.role : '',
			options: ['', 'client', 'employee'],
			label: 'Select Role',
			col: 12,
		};
		const roleSchema = Yup.object().shape({
			role: Yup.string().required('Required!'),
		});
		formElements.splice(formElements.length - 1, 0, roleElement);
		modifiedSchema
			? modifiedSchema.concat(roleSchema)
			: accountSchema.concat(roleSchema);
	}

	const onSubmitHandler = (values) => {
		if (!props.edit && !props.add) {
			// console.log(values);
			dispatch(actions.accountCreation(values, user, org));
		} else {
			var empData = new FormData();
			// console.log(props.values);
			// console.log(values);

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

			// console.log(empData.entries);

			if (props.edit) {
				empData.append('empId', props.values.empId);
				empData.append('emailId', props.values.emailId);
				empData.append('orgId', props.values.orgId);
				empData.append('deptId', parseInt(values.dept));
				empData.append('role', values.role);
				setLoading(true);
				axios
					.put('/attendance/api/accounts/' + props.values.empId + '/', empData)
					.then((res) => {
						// console.log(res.data);
						setLoading(false);
						props.onEditingDone(res.data);
					})
					.catch((err) => {
						// console.log(err);
						setError(showErrors(err));
						setLoading(false);
					});
			} else {
				setLoading(true);
				axios
					.post('/attendance/api/user/register', {
						email: values.email,
						password: values.password,
						is_staff: false,
					})
					.then((res) => {
						// console.log(res);
						empData.append('emailId', res.data.email);
						empData.append('deptId', parseInt(values.dept));
						if (user.user.is_superuser) {
							empData.append('role', values.role);
							empData.append('empId', props.org.pk + res.data.id);
							empData.append('orgId', props.org.pk);
						} else {
							empData.append('empId', org.details.pk + res.data.id);
							empData.append('orgId', org.details.pk);
							empData.append('role', 'employee');
						}
						axios
							.post('/attendance/api/accounts/register', empData)
							.then((res) => {
								// console.log(res.data);
								setLoading(false);
								props.onEditingDone(res.data);
							})
							.catch((err) => {
								// console.log(err);
								setLoading(false);
								setError(showErrors(err));
							});
					})
					.catch((err) => {
						// console.log(err.message);
						setLoading(false);
						setError(showErrors(err));
					});
			}
		}
	};

	if (
		!props.edit &&
		!props.add &&
		account.details.pk &&
		!account.loading &&
		!account.error
	) {
		return <Redirect to='/home' />;
	}

	return (
		<div className='d-flex align-items-center flex-column mb-2'>
			<CustomForm
				elements={formElements}
				validationSchema={props.add ? modifiedSchema : accountSchema}
				handleSubmit={onSubmitHandler}
			/>
			{account.error ? (
				<p className='py-2 text-danger'>{account.error.message}</p>
			) : (
				''
			)}
			<div className='w-100'>
				{loading && <Loader loading={loading} />}
				{error && <p className='text-danger text-capitalize'>{error}</p>}
			</div>
		</div>
	);
};

export default AccountForm;
