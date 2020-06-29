import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import Loader from '../loader';

const EmployeeStat = (props) => {
	const maxData = useSelector((state) => state.acc.maxAttendanceEmployee);
	const minData = useSelector((state) => state.acc.minAttendanceEmployee);

	const data = {
		labels: ['Status'],
		datasets: [
			{
				label: 'Present',
				backgroundColor: 'rgba(37, 79, 180, 0.8)',
				borderColor: 'rgba(37, 79, 180, 1)',
				borderWidth: 1,
				data: maxData ? (props.type === 'max' ? [maxData[1]] : [minData[1]]) : [0],
				maxBarThickness: 25,
			},
			{
				label: 'Absent',
				backgroundColor: 'rgba(60, 200, 210, 0.8)',
				borderColor: 'rgba(60, 200, 210, 1)',
				borderWidth: 1,
				data: maxData ? (props.type === 'max' ? [maxData[2]] : [minData[2]]) : [0],
				maxBarThickness: 25,
			},
			{
				label: 'Leaves',
				backgroundColor: 'rgba(255, 224, 30, 0.8)',
				borderColor: 'rgba(255, 224, 30, 1)',
				borderWidth: 1,
				data: maxData ? (props.type === 'max' ? [maxData[3]] : [minData[3]]) : [0],
				maxBarThickness: 25,
			},
		],
	};

	return (
		<>
			<div className='my-3'>
				<Loader loading={data ? false : true} />
			</div>
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
		</>
	);
};

export default EmployeeStat;
