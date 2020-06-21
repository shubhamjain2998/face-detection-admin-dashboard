import React, { useEffect, useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../axios-faceDet';
import moment from 'moment';
import * as actions from '../../store/actions/index';

const LastMonthStat = (props) => {
	const employees = useSelector((state) => state.acc.list);
	const org = useSelector((state) => state.org);
	const [data, setData] = useState(null);

	const dispatch = useDispatch();

	let Labels = [];
	let present = [];
	let absent = [];
	let leave = [];

	useEffect(() => {
		axios
			.get(
				'attendance/api/report?orgId=' +
					org.details.pk +
					'&month=' +
					moment().subtract(1, 'M').format('M')
			)
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => console.log(err));
	}, [org.details]);

	if (data) {
		let deltaPresent = 0;
		let deltaAbsent = 0;
		let deltaLeave = 0;
		let maxPresent = 0;
		let maxAbsent = 0;
		let maxLeave = 0;
		let minPresent = 0;
		let minAbsent = 0;
		let minLeave = 0;
		for (let i in data) {
			const temp = data[i];
			for (let j = 0; j < temp.length; j++) {
				if (temp[j] === 1) {
					deltaPresent += 1;
				} else if (temp[j] === 0) {
					deltaAbsent += 1;
				} else {
					deltaLeave += 1;
				}
			}
			maxPresent = maxPresent < deltaPresent ? deltaPresent : maxPresent;
			maxAbsent = maxAbsent < deltaAbsent ? deltaAbsent : maxAbsent;
			maxLeave = maxLeave < deltaLeave ? deltaLeave : maxLeave;
			minPresent =
				minPresent > deltaPresent || minPresent === 0 ? deltaPresent : minPresent;
			minAbsent =
				minAbsent > deltaAbsent || minAbsent === 0 ? deltaAbsent : minAbsent;
			minLeave = minLeave > deltaLeave || minLeave === 0 ? deltaLeave : minLeave;
			present.push(deltaPresent);
			absent.push(deltaAbsent);
			leave.push(deltaLeave);
			deltaPresent = 0;
			deltaAbsent = 0;
			deltaLeave = 0;
		}
		dispatch(actions.setMaxAttendance([maxPresent, maxAbsent, maxLeave]));
		dispatch(actions.setMinAttendance([minPresent, minAbsent, minLeave]));
	}

	for (let i = 0; i < employees.length; i++) {
		Labels.push(employees[i].firstName + ' ' + employees[i].lastName);
	}

	const Data = {
		labels: Labels,
		datasets: [
			{
				label: 'Present',
				backgroundColor: 'rgba(75, 192, 192, 0.8)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
				data: present,
				maxBarThickness: 25,
			},
			{
				label: 'Absent',
				backgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
				data: absent,
				maxBarThickness: 25,
			},
			{
				label: 'Leaves',
				backgroundColor: 'rgba(255, 206, 86, 0.8)',
				borderColor: 'rgba(255, 206, 86, 1)',
				borderWidth: 1,
				data: leave,
				maxBarThickness: 25,
			},
		],
	};

	return (
		<div className='graph'>
			{data && (
				<HorizontalBar
					data={Data}
					options={{
						// responsive: true,
						maintainAspectRatio: false,
						legend: {
							display: true,
							position: 'bottom',
						},
						scales: {
							xAxes: [
								{
									stacked: true,
								},
							],
							yAxes: [
								{
									stacked: true,
								},
							],
						},
					}}
				/>
			)}
		</div>
	);
};

export default LastMonthStat;
