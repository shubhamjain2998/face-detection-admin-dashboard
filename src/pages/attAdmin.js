import React, { useState, useEffect } from 'react';
import {
	Container,
	Col,
	Row,
	Table,
	Form,
	FormControl,
	Button,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from '../axios-faceDet';
import { TiTick, TiDeleteOutline } from 'react-icons/ti';
import { FcLeave } from 'react-icons/fc';
import { BsTriangleHalf } from 'react-icons/bs';
import moment from 'moment';
import FileDownload from 'js-file-download';

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
	const org = useSelector((state) => state.org);
	const user = useSelector((state) => state.user.user);
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

	const generateReport = () => {
		axios
			.get(
				`/attendance/api/report_download?orgId=${org.details.pk}&month=${month + 1}`
			)
			.then((res) =>
				FileDownload(
					res.data,
					`report ${moment().format('DD-MM-YYYY,hh:mm:ss a')}.csv`
				)
			)
			.catch((err) => console.log(err));
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
			<Row className='my-2'>
				<Col xs={6} md={3}>
					<div className='att-icon-detail'>
						<span className='mx-1'>
							<TiTick color='green' size='1.5em' />
						</span>
						<p>Present</p>
					</div>{' '}
				</Col>
				<Col xs={6} md={3}>
					<div className='att-icon-detail'>
						<span className='mx-1'>
							<BsTriangleHalf color='blue' size='1.5em' />
						</span>
						<p>Half Day</p>
					</div>{' '}
				</Col>
				<Col xs={6} md={3}>
					<div className='att-icon-detail'>
						<span className='mx-1'>
							<TiDeleteOutline color='red' size='1.5em' />
						</span>
						<p>Absent</p>
					</div>{' '}
				</Col>
				<Col xs={6} md={3}>
					<div className='att-icon-detail'>
						<span className='mx-1'>
							<FcLeave color='yellow' size='1.5em' className='leave-icon' />
						</span>
						<p>On Leave</p>
					</div>{' '}
				</Col>
			</Row>
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
												{daysInMonth(month + 1, moment().year()).map((d) => {
													const temp_att = att.filter(
														(attendance) =>
															attendance.empId === emp.empId &&
															moment(attendance.date).date() === d &&
															moment(attendance.date).month() === month
													)[0];

													if (temp_att && temp_att.leave) {
														return (
															<td key={d}>
																<FcLeave color='yellow' size='1.5em' className='leave-icon' />
															</td>
														);
													} else if (temp_att && !temp_att.leave) {
														if (
															temp_att.check_in > '10:00:00' ||
															temp_att.check_out < '06:00:00'
														) {
															return (
																<td key={d}>
																	<BsTriangleHalf color='blue' size='1.5em' />
																</td>
															);
														}
														return (
															<td key={d}>
																<OverlayTrigger
																	placement='top'
																	overlay={
																		<Tooltip id='tooltip-present'>
																			<p style={{ marginBottom: '0' }}>
																				Entry Time: {temp_att.check_in}
																			</p>
																			<p style={{ marginBottom: '0' }}>
																				Exit Time: {temp_att.check_out}
																			</p>
																		</Tooltip>
																	}
																>
																	<TiTick color='green' size='1.5em' />
																</OverlayTrigger>
															</td>
														);
													} else {
														return (
															<td key={d}>
																<TiDeleteOutline color='red' size='1.5em' />
															</td>
														);
													}
												})}
											</tr>
										);
									})}
							</tbody>
						</Table>
					</div>
				</Col>
			</Row>
			{!user.is_superuser && (
				<Row className='justify-content-center my-3'>
					<Col xs={6} sm={4}>
						<Button
							className='mt-3 download-button'
							variant='outline-primary'
							block
							onClick={generateReport}
						>
							Download as CSV
						</Button>
					</Col>
				</Row>
			)}
		</Container>
	);
};

export default AttendanceAdmin;
