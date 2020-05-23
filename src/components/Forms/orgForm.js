import React from 'react';
import CustomForm from './customForm';
import * as actions from '../../store/actions/index';
import * as Yup from 'yup';
import { connect } from 'react-redux';

const organizationSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
	orgType: Yup.string().required('Required'),
	phone: Yup.number().min(10, 'Invalid Number!').required('Required'),
	staffCount: Yup.number().required('Required'),
});

const formElements = [
	{ name: 'name', type: 'text', value: '', placeholder: 'Organization Name' },
	{ name: 'orgType', type: 'text', value: '', placeholder: 'Organization Type' },
	{ name: 'phone', type: 'number', value: '', placeholder: 'Contact Number' },
	{ name: 'staffCount', type: 'number', value: '', placeholder: 'Total Staff' },
	{ name: 'logo', type: 'file', value: '' },
];

const OrganizationForm = (props) => {
	const onSubmitHandler = (values) => {
        console.log(values);
        props.addOrganization(values);
	};

	return (
		<CustomForm
			elements={formElements}
			validationSchema={organizationSchema}
			handleSubmit={onSubmitHandler}
		/>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		addOrganization: (orgDetails) => dispatch(actions.orgCreation(orgDetails)),
	};
};

export default connect(null, mapDispatchToProps)(OrganizationForm);
