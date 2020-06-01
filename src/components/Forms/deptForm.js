import React, { useState } from 'react';
import * as Yup from 'yup';
import CustomForm from './customForm';
import { useSelector } from 'react-redux';
import axios from '../../axios-faceDet';

const departmentSchema = Yup.object().shape({
	DeptName: Yup.string().required('Required'),
	Description: Yup.string().required('Required'),
});

const DepartmentForm = (props) => {
	const org = useSelector((state) => state.org);
	const user = useSelector((state) => state.user.user);
	const [error, setError] = useState(null);

	const onSubmitHandler = (values) => {
		console.log(values);
		let data;
		if (props.mode === 'add') {
			if (user.is_superuser) {
				data = {
					depId: values.depId + Math.floor(Math.random() * 1000),
					DeptName: values.DeptName,
					Description: values.Description,
				};
			} else {
				data = {
					depId: org.details.pk + Math.floor(Math.random() * 1000),
					DeptName: values.DeptName,
					Description: values.Description,
				};
			}
		} else {
			data = {
				depId: props.dept.depId + Math.floor(Math.random() * 1000),
				DeptName: values.DeptName,
				Description: values.Description,
			};
		}

		if (props.mode === 'add') {
			axios
				.post('/attendance/api/dept', data)
				.then((res) => {
					console.log(res.data);

					props.onEditingDone();
				})
				.catch((err) => {
					console.log(err.response.data);
					setError(error.response.data.non_field_errors.join(' '));
				});
		} else {
			axios
				.put('/attendance/api/dept/' + props.dept.id + '/', data)
				.then((res) => {
					console.log(res.data);
					props.onEditingDone();
				})
				.catch((err) => {
					console.log(err.response.data);
					setError(error.response.data.non_field_errors.join(' '));
				});
		}
	};

	const formElements = [
		{
			name: 'DeptName',
			type: 'text',
			value: props.mode === 'edit' ? props.dept.DeptName : '',
			placeholder: 'Department Name',
			col: '12',
		},
		{
			name: 'Description',
			type: 'text',
			value: props.mode === 'edit' ? props.dept.Description : '',
			placeholder: 'Department Description',
			col: '12',
		},
	];

	if (user.is_superuser && props.mode === 'add') {
		const orgElement = {
			name: 'depId',
			type: 'select',
			value: org.list[0].pk,
			options: org.list.map((og) => {
				return { name: og.Name, value: og.pk };
			}),
		};
		formElements.unshift(orgElement);
	}

	return (
		<>
			<CustomForm
				elements={formElements}
				validationSchema={departmentSchema}
				handleSubmit={onSubmitHandler}
			/>
			{error && <p className='px-2 my-2 text-danger'>{error}</p>}
		</>
	);
};

export default DepartmentForm;
