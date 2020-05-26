import React, { useEffect } from 'react';
import * as actions from '../store/actions/index';
import axios from '../axios-faceDet';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get('attendance/api/org')
			.then((res) => {
				console.log(res.data);
				dispatch(actions.fetchOrgs(res.data));
			})
			.catch((err) => console.log(err.message));
	}, [dispatch]);

	return <h4>Dashboard</h4>;
};

export default Dashboard;
