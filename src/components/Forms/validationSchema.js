import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
	firstName: Yup.string().required('Required'),
	lastName: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    companyName: Yup.string().required('Required'),
    orgType: Yup.string().required('Required'),

	email: Yup.string().email('Invalid Email').required('Required'),

	password: Yup.string().required('Required'),
	confirmPassword: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Passwords must match'
	),

	clientId: Yup.number().required('Required'),
    phone: Yup.number().min(10, 'Invalid Number!').required('Required'),
    staffCount: Yup.number().required('Required'),
});



export default ValidationSchema;
