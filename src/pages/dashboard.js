import React, { useEffect } from 'react';
import * as actions from '../store/actions/index';
import headerBg from '../assets/test_Cropped.jpg';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import axios from '../axios-faceDet';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	const totalOrgs = useSelector((state) => state.org.list);
	const totalAcc = useSelector((state) => state.acc.list);
	const totalUser = useSelector((state) => state.user.list);
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

			dispatch(actions.fetchUsers());
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
	return (
		<Container fluid>
			<Row>
				<Col xl={10} sm={9}>
					<Row className='px-5 dashboard-header'>
						<Image src={headerBg} alt='' />
					</Row>
				</Col>
				<Col xl={2} sm={3} className='right-sidebar dashboard'>
					<p className='dashboard-heading'>Stats</p>
					<div className='stats-card'>
						<h2>{totalOrgs.length}</h2>
						<p>Organizations registered</p>
					</div>
					<div className='stats-card'>
						<h2>{totalAcc.length}</h2>
						<p>Employees registered</p>
					</div>
					<div className='stats-card'>
						<h2>{totalUser.length}</h2>
						<p>Active Users</p>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
