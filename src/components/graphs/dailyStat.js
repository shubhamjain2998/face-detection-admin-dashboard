import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from '../../axios-faceDet';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Loader from '../loader';

const DailyStat = () => {
	const [data, setData] = useState(null);
	const org = useSelector((state) => state.org);
	let present = 0;
	let absent = 0;
	let leave = 0;

	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();

		axios
			.get(
				'/attendance/api/daily_report?orgId=' +
					org.details.pk +
					'&date=' +
					moment().format('YYYY-MM-DD')
			)
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => console.log(err));

		return () => {
			source.cancel();
		};
	}, [org.details]);

	if (data) {
		present = data.present;
		absent = data.absent;
		leave = data.leave;
	}

	const Data = {
		labels: ['Present', 'Absent', 'On Leave'],
		datasets: [
			{
				label: '# of Votes',
				// data: [100, 20, 5],
				data: [present, absent, leave],
				backgroundColor: [
					'rgba(37, 79, 180, 0.8)',
					'rgba(60, 200, 210, 0.8)',
					'rgba(255, 224, 30, 0.8)',
				],
				borderColor: [
					'rgba(37, 79, 180, 1)',
					'rgba(60, 200, 210, 1)',
					'rgba(255, 224, 30, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	return (
		<>
			<div className='my-3'>
				<Loader loading={data ? false : true} />
			</div>
			<div className='graph'>
				{data && (
					<Pie
						data={Data}
						options={{
							maintainAspectRatio: false,
						}}
					/>
				)}
			</div>
		</>
	);
};

export default DailyStat;
