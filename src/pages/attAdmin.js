import React, { useState, useEffect } from 'react';
import {
	Container,
	Col,
	Row,
	Table,
	Form,
	FormControl,
	Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from '../axios-faceDet';
import { TiTick, TiDeleteOutline } from 'react-icons/ti';
import moment from 'moment';

let months = [];

for (let i = 0; i <= 3; i++) {
	months.push(moment().subtract(i, 'months'));
}

// Month here is 1-indexed (January is 1, February is 2, etc). This is
// because we're using 0 as the day so that it returns the last day
// of the last month, so you have to add 1 to the month number
// so it returns the correct amount of days
const daysInMonth = (month, year) => {
	const days = [];
	const totalDays = new Date(year, month, 0).getDate();
	for (let i = 1; i <= totalDays; i++) {
		days.push(i);
	}
	return days;
};

const AttendanceAdmin = () => {
	const employees = useSelector((state) => state.acc.list);
	const [att, setAtt] = useState(null);
	const [month, setMonth] = useState(moment(months[0]).month());

	useEffect(() => {
		axios
			.get('/attendance/api/attendance')
			.then((res) => {
				setAtt(res.data);
			})
			.catch((err) => {
				// console.log(err);
			});
	}, []);

	const onChangeHandler = (event) => {
		event.preventDefault();
		setMonth(parseInt(event.target.value));
	};

	return (
		<Container fluid>
			<Form.Row className='mt-2 mb-1'>
				<p className='text-primary mb-1 pl-3'>Select Month</p>
			</Form.Row>
			<Form.Row className='mb-2 pb-2 mt-1'>
				<Col sm={4} xs={8}>
					<FormControl as='select' name='selectedOrg' onChange={onChangeHandler}>
						{months.map((m) => (
							<option key={m} value={moment(m).month()}>
								{moment(m).format('MMMM')}
							</option>
						))}
					</FormControl>
				</Col>
			</Form.Row>
			<Row>
				<Col>
					<div className='table-responsive attendance-table'>
						<Table>
							<thead>
								<tr>
									<td>Employee</td>
									{daysInMonth(month + 1, moment().year()).map((d) => (
										<td key={d}>{d}</td>
									))}
								</tr>
							</thead>
							<tbody>
								{att &&
									employees.map((emp) => {
										return (
											<tr key={emp.pk}>
												<td>{emp.firstName + ' ' + emp.lastName}</td>
												{daysInMonth(month + 1, moment().year()).map((d) =>
													att.filter(
														(attendance) =>
															attendance.empId === emp.empId &&
															moment(attendance.date).date() === d &&
															moment(attendance.date).month() === month
													).length > 0 ? (
														<td key={d}>
															<TiTick color='green' size='1.5em' />
														</td>
													) : (
														<td key={d}>
															<TiDeleteOutline color='red' size='1.5em' />
														</td>
													)
												)}
											</tr>
										);
									})}
							</tbody>
						</Table>
					</div>
				</Col>
			</Row>
			{/* <Row>
				<Col xs={{span: 8, offset: 2}} sm={4}>
					<Button className='mt-3' variant='outline-primary' block>
						Download Report
					</Button>
				</Col>
			</Row> */}
		</Container>
	);
};

export default AttendanceAdmin;
