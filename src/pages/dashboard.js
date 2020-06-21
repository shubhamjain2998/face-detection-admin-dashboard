import React, { useEffect } from 'react';
import * as actions from '../store/actions/index';
import headerBg from '../assets/dashboard_header.jpeg';
import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from '../axios-faceDet';
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';
import DailyStat from '../components/graphs/dailyStat';
import LastMonthStat from '../components/graphs/lastMonth';
import EmployeeStat from '../components/graphs/employee';

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
					// console.log(res.data);
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
				<Col xl={10} lg={9} className='order-1'>
					<Row className='px-5 dashboard-header '>
						<Image src={headerBg} alt='' />
					</Row>
				</Col>
				<Col xl={2} lg={3} className='right-sidebar dashboard order-2'>
					<p className='dashboard-heading'>Stats</p>
					<div className='stats-card'>
						<h2>
							<CountUp end={totalOrgs.length} duration={3} />
						</h2>
						<p>Organizations registered</p>
					</div>
					<div className='stats-card'>
						<h2>
							<CountUp end={totalAcc.length} duration={3} />
						</h2>
						<p>Employees registered</p>
					</div>
					<div className='stats-card'>
						<h2>
							<CountUp end={totalUser.length} duration={3} />
						</h2>
						<p>Active Users</p>
					</div>
				</Col>
			</Row>
			{!user.is_superuser && user.is_staff && (
				<Row className='my-4 mx-2'>
					<Col sm={12} lg={5} className='my-1'>
						<h3 className='graph-header'>Today's Statistics</h3>
						<DailyStat />
					</Col>
					<Col sm={12} lg={5} className='my-1'>
						<h3 className='graph-header'>Last Month Productivity</h3>
						<LastMonthStat />
					</Col>
					<Col sm={12} lg={5} className='my-1'>
						<h3 className='graph-header'>Most Productive Employee</h3>
						<Row>
							<Col xs={6}>
								<EmployeeStat type='max' />
							</Col>
						</Row>
					</Col>
					<Col sm={12} lg={5} className='my-1'>
						<h3 className='graph-header'>Least Productive Employee</h3>
						<Row>
							<Col xs={6}>
								<EmployeeStat type='min' />
							</Col>
						</Row>
					</Col>
				</Row>
			)}
		</Container>
	);
};

export default Dashboard;
