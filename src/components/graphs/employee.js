import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const EmployeeStat = (props) => {
	const maxData = useSelector((state) => state.acc.maxAttendanceEmployee);
	const minData = useSelector((state) => state.acc.minAttendanceEmployee);

	const data = {
		labels: ['Status'],
		datasets: [
			{
				label: 'Present',
				backgroundColor: 'rgba(75, 192, 192, 0.8)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
				data: maxData ? (props.type === 'max' ? [maxData[0]] : [minData[0]]) : [0],
				maxBarThickness: 25,
			},
			{
				label: 'Absent',
				backgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
				data: maxData ? (props.type === 'max' ? [maxData[1]] : [minData[1]]) : [0],
				maxBarThickness: 25,
			},
			{
				label: 'Leaves',
				backgroundColor: 'rgba(255, 206, 86, 0.8)',
				borderColor: 'rgba(255, 206, 86, 1)',
				borderWidth: 1,
				data: maxData ? (props.type === 'max' ? [maxData[2]] : [minData[2]]) : [0],
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
					scales: {
						yAxes: [
							{
								ticks: {
									beginAtZero: true,
									min: 0,
									max: 35,
								},
							},
						],
					},
				}}
			/>
		</div>
	);
};

export default EmployeeStat;
