import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from '../../axios-faceDet';
import { useSelector } from 'react-redux';
import moment from 'moment';

const DailyStat = () => {
	const [data, setData] = useState(null);
	const org = useSelector((state) => state.org);
	let present = 0;
	let absent = 0;
	let leave = 0;

	useEffect(() => {
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
					'rgba(75, 192, 192, 0.8)',
					'rgba(255, 99, 132, 0.8)',
					'rgba(255, 206, 86, 0.8)',
				],
				borderColor: [
					'rgba(75, 192, 192, 1)',
					'rgba(255, 99, 132, 1)',
					'rgba(255, 206, 86, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	return (
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
	);
};

export default DailyStat;
