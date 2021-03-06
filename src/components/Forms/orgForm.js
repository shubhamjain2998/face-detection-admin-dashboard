import React, { useState } from 'react';
import CustomForm from './customForm';
import * as actions from '../../store/actions/index';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-faceDet';
import { showErrors } from '../../store/reducers/utility';
import Loader from '../loader';

const FILE_SIZE = 10485760;

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const organizationSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
	orgType: Yup.string().required('Required'),
	phone: Yup.number().min(10, 'Invalid Number!').required('Required'),
	staffCount: Yup.number().required('Required'),
	logo: Yup.mixed()
		.default(null)
		.test(
			'fileSize',
			'File too large',
			value => !value || (value && value.size <= FILE_SIZE)
		)
		.test(
			'fileFormat',
			'Unsupported Format',
			value => !value || (value => value && SUPPORTED_FORMATS.includes(value.type))
		),
});

const OrganizationForm = (props) => {
	const dispatch = useDispatch();
	const organization = useSelector((state) => state.org);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const onSubmitHandler = (values) => {
		// console.log(values);
		if (!props.edit && !props.add) {
			dispatch(actions.orgCreation(values));
		} else {
			const orgdata = new FormData();
			orgdata.append('Name', values.name);
			orgdata.append('orgType', values.orgType);
			orgdata.append('contact', values.phone);
			orgdata.append('staffcount', values.staffCount);
			orgdata.append('logo', values.logo);
			if (props.edit) {
				setLoading(true);
				axios
					.put('/attendance/api/org/' + props.values.pk + '/', orgdata)
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
					.post('/attendance/api/org', orgdata)
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
			}
		}
	};

	const formElements = [
		{
			name: 'name',
			type: 'text',
			value: props.edit ? props.values.Name : '',
			label: 'Organization Name',
			col: 12,
		},
		{
			name: 'orgType',
			type: 'text',
			value: props.edit ? props.values.orgType : '',
			label: 'Organization Type',
			col: 12,
		},
		{
			name: 'phone',
			type: 'number',
			value: props.edit ? parseInt(props.values.contact) : '',
			label: 'Contact Number',
			col: 12,
		},
		{
			name: 'staffCount',
			type: 'number',
			value: props.edit ? props.values.staffcount : '',
			label: 'Total Staff',
			col: 12,
		},
		{
			name: 'logo',
			type: 'file',
			value: props.edit ? props.values.logo : '',
			label: 'Organization Logo',
			valid: props.values ? (props.values.logo ? true : false) : false,
			path: props.values ? props.values.logo : '',
		},
	];

	// if (!props.edit) {
	// 	if (organization.details.pk && !organization.loading && !organization.error) {
	// 		return <Redirect to='/account' />;
	// 	}
	// }

	return (
		<div className='d-flex align-items-center flex-column'>
			{props.edit || props.add ? (
				''
			) : (
				<>
					{/* <h5 className='my-0'>Register Your Organization</h5> */}
					{/* <p className='text-secondary'>Access to our Dashboard</p> */}
				</>
			)}

			<CustomForm
				elements={formElements}
				validationSchema={organizationSchema}
				handleSubmit={onSubmitHandler}
			/>
			{organization.error ? (
				<p className='py-2 text-danger'>{organization.error.message}</p>
			) : (
				''
			)}
			{loading && <Loader loading={loading} />}
			{error && <p className='text-danger text-capitalize'>{error}</p>}
		</div>
	);
};

export default OrganizationForm;
