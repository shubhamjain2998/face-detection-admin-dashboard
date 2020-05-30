import React from 'react';
import * as Yup from 'yup';
import CustomForm from './customForm';
import axios from '../../axios-faceDet';

const departmentSchema = Yup.object().shape({
	DeptName: Yup.string().required('Required'),
	Description: Yup.string().required('Required'),
});

const DepartmentForm = (props) => {
	const onSubmitHandler = (values) => console.log(values);

	const formElements = [
		{
			name: 'DeptName',
			type: 'text',
			value: props.edit ? props.values.DeptName : '',
			placeholder: 'Department Name',
			col: '12',
		},
		{
			name: 'Description',
			type: 'text',
			value: props.edit ? props.values.Description : '',
			placeholder: 'Department Description',
			col: '12',
		},
	];

	return (
		<CustomForm
			elements={formElements}
			validationSchema={departmentSchema}
			handleSubmit={onSubmitHandler}
		/>
	);
};

export default DepartmentForm;