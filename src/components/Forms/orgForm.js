import React from 'react';
import CustomForm from './customForm';
import * as actions from '../../store/actions/index';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const FILE_SIZE = 10485760;

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const organizationSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
	orgType: Yup.string().required('Required'),
	phone: Yup.number().min(10, 'Invalid Number!').required('Required'),
	staffCount: Yup.number().required('Required'),
	logo: Yup.mixed()
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
	{ name: 'name', type: 'text', value: '', placeholder: 'Organization Name' },
	{ name: 'orgType', type: 'text', value: '', placeholder: 'Organization Type' },
	{ name: 'phone', type: 'number', value: '', placeholder: 'Contact Number' },
	{ name: 'staffCount', type: 'number', value: '', placeholder: 'Total Staff' },
	{ name: 'logo', type: 'file', value: '', label: 'Organization Logo' },
];

const OrganizationForm = (props) => {
	const dispatch = useDispatch();
	const organization = useSelector((state) => state.org);

	const onSubmitHandler = (values) => {
		console.log(values);
		dispatch(actions.orgCreation(values));
	};

	if (organization.details.pk && !organization.loading && !organization.error) {
		return <Redirect to='/account' />
	}

	return (
		<div className='d-flex align-items-center flex-column'>
			<h5 className='my-0'>Register Your Organization</h5>
			<p className='text-secondary'>Access to our Dashboard</p>
			<CustomForm
				elements={formElements}
				validationSchema={organizationSchema}
				handleSubmit={onSubmitHandler}
			/>
		</div>
	);
};

export default OrganizationForm;
