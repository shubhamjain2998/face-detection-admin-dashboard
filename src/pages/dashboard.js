import React, { useEffect } from 'react';
import * as actions from '../store/actions/index';
import axios from '../axios-faceDet';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	const account = useSelector((state) => state.acc.details);

	useEffect(() => {
		if (user.is_superuser) {
			axios
				.get('attendance/api/accounts')
				.then((res) => {
					console.log(res.data);
					dispatch(actions.setAccounts(res.data));
				})
				.catch((err) => console.log(err.response.data));
			axios
				.get('attendance/api/org')
				.then((res) => {
					console.log(res.data);
					dispatch(actions.fetchOrgs(res.data));
				})
				.catch((err) => console.log(err.response.data));
		} else {
			axios
				.get('/attendance/api/accounts/filter?orgId=' + account.orgId)
				.then((res) => {
					console.log(res.data);
					dispatch(actions.setAccounts(res.data));
				})
				.catch((err) => console.log(err.response.data));
		}
	}, [dispatch, account.orgId, user.is_superuser]);

	// return <TrainingImages />;
	return <h4>Dashboard</h4>;
};

export default Dashboard;
