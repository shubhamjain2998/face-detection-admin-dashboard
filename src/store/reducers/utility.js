export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties,
	};
};

export const organization = {
	error: null,
	loading: false,
	details: {
		url: '',
		pk: null,
		Name: null,
		orgType: null,
		contact: null,
		staffcount: null,
		logo: 'null',
	},
	currentOrg: {
		url: '',
		pk: null,
		Name: null,
		orgType: null,
		contact: null,
		staffcount: null,
		logo: 'null',
	},
};

export const user = {
	error: null,
	token: null,
	loading: false,
	user: {
		pk: null,
		email: null,
		is_superuser: false,
	},
};

export const accounts = {
	error: null,
	loading: false,
	details: {
		pk: null,
		empId: null,
		emailId: null,
		username: null,
		firstName: null,
		lastName: null,
		gender: null,
		phone: null,
		readEmp: false,
		addEmp: false,
		readAtt: false,
		addAtt: false,
		readDept: false,
		addDept: false,
		idType: null,
		idProof: null,
		profileImg: null,
		orgId: null,
		deptId: null,
		role: null,
	},
};
