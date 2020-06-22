import React from 'react';
import { Bar } from 'react-chartjs-2';

const OrgStat = (props) => {
	const data = {
		labels: ['Status'],
		datasets: [
			{
				label: 'Organizations',
				backgroundColor: 'rgba(37, 79, 180, 0.8)',
				borderColor: 'rgba(37, 79, 180, 1)',
				borderWidth: 1,
				data: [props.org.length],
				maxBarThickness: 25,
			},
			{
				label: 'Active Users',
				backgroundColor: 'rgba(60, 200, 210, 0.8)',
				borderColor: 'rgba(60, 200, 210, 1)',
				borderWidth: 1,
				data: [props.users.filter((user) => user.is_active).length],
				maxBarThickness: 25,
			},
			{
				label: 'Inactive Users',
				backgroundColor: 'rgba(255, 224, 30, 0.8)',
				borderColor: 'rgba(255, 224, 30, 1)',
				borderWidth: 1,
				data: [props.users.filter((user) => !user.is_active).length],
				maxBarThickness: 25,
			},
		],
	};

	return (
		<div className='graph'>
			<Bar
				data={data}
				options={{
					// responsive: true,
					maintainAspectRatio: false,
					legend: {
						display: true,
						position: 'bottom',
					},
					// scales: {
					// 	yAxes: [
					// 		{
					// 			ticks: {
					// 				beginAtZero: true,
					// 				min: 0,
					// 				max: 35,
					// 			},
					// 		},
					// 	],
					// },
				}}
			/>
		</div>
	);
};

export default OrgStat;
