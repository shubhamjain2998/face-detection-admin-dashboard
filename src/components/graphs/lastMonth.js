import React, { useEffect, useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../axios-faceDet';
import moment from 'moment';
import * as actions from '../../store/actions/index';
import Loader from '../loader';

const LastMonthStat = (props) => {
	const employees = useSelector((state) => state.acc.list);
	const [maxAtt, setMaxAtt] = useState(null);
	const [minAtt, setMinAtt] = useState(null);
	const org = useSelector((state) => state.org);
	const [data, setData] = useState(null);

	const dispatch = useDispatch();

	let Labels = [];
	let present = [];
	let absent = [];
	let leave = [];

	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();

		axios
			.get(
				'attendance/api/report?orgId=' +
					org.details.pk +
					'&month=' +
					moment().subtract(1, 'M').format('M')
			)

			.then((res) => {
				if (!data) {
					// console.log(res.data)
					setData(res.data);
				}
			})
			.catch((err) => console.log(err));

		return () => {
			source.cancel();
		};
	}, [org.details, data]);

	useEffect(() => {
		if (maxAtt && minAtt) {
			dispatch(actions.setMaxAttendance(maxAtt));
			dispatch(actions.setMinAttendance(minAtt));
		}
	}, [maxAtt, minAtt, dispatch]);

	let maxAttendance = [0, 0, 0, 0];
	let minAttendance = [0, 0, 0, 0];

	if (data) {
		let deltaPresent = 0;
		let deltaAbsent = 0;
		let deltaLeave = 0;

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

			if (maxAttendance[1] < deltaPresent || maxAttendance[1] === 0) {
				maxAttendance[0] = parseInt(i);
				maxAttendance[1] = deltaPresent;
				maxAttendance[2] = deltaAbsent;
				maxAttendance[3] = deltaLeave;
			}
			if (minAttendance[1] > deltaPresent || minAttendance[1] === 0) {
				minAttendance[0] = parseInt(i);
				minAttendance[1] = deltaPresent;
				minAttendance[2] = deltaAbsent;
				minAttendance[3] = deltaLeave;
			}
			present.push(deltaPresent);
			absent.push(deltaAbsent);
			leave.push(deltaLeave);
			deltaPresent = 0;
			deltaAbsent = 0;
			deltaLeave = 0;
		}
	}

	// console.log(maxAttendance);

	if (data && !maxAtt) {
		setMaxAtt(maxAttendance);
	}
	if (data && !minAtt) {
		setMinAtt(minAttendance);
	}

	for (let i = 0; i < employees.length; i++) {
		Labels.push(employees[i].firstName + ' ' + employees[i].lastName);
	}

	const Data = {
		labels: Labels,
		datasets: [
			{
				label: 'Present',
				backgroundColor: 'rgba(37, 79, 180, 0.8)',
				borderColor: 'rgba(37, 79, 180, 1)',
				borderWidth: 1,
				data: present,
				maxBarThickness: 25,
			},
			{
				label: 'Absent',
				backgroundColor: 'rgba(60, 200, 210, 0.8)',
				borderColor: 'rgba(60, 200, 210, 1)',
				borderWidth: 1,
				data: absent,
				maxBarThickness: 25,
			},
			{
				label: 'Leaves',
				backgroundColor: 'rgba(255, 224, 30, 0.8)',
				borderColor: 'rgba(255, 224, 30, 1)',
				borderWidth: 1,
				data: leave,
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
		</>
	);
};

export default LastMonthStat;
