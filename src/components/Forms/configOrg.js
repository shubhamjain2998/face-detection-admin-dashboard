import React, { useState } from 'react';
import TimePicker from 'react-bootstrap-time-picker';
import { Row, Col, Button } from 'react-bootstrap';

const ConfigOrg = (props) => {
	const [checkInStart, setCheckInStart] = useState('10:00');
	const [checkInEnd, setCheckInEnd] = useState('10:00');
	const [checkOutStart, setCheckOutStart] = useState('10:00');
	const [checkOutEnd, setCheckOutEnd] = useState('10:00');

	const submitValues = () => {
		const config = {
			check_in_start: checkInStart,
			check_in_end: checkInEnd,
			check_out_start: checkOutStart,
			check_out_end: checkOutEnd,
		};
		props.passValues(config);
	};

	const toHHMMSS = (sec_num) => {
		// var sec_num = parseInt(this, 10); // don't forget the second param
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - hours * 3600) / 60);
		var seconds = sec_num - hours * 3600 - minutes * 60;

		if (hours < 10) {
			hours = '0' + hours;
		}
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		return hours + ':' + minutes + ':' + seconds;
	};

	console.log(checkInStart);

	return (
		<Row>
			<Col xs={6} className='my-1 py-1'>
				<TimePicker
					value={checkInStart}
					onChange={(time) => setCheckInStart(toHHMMSS(time))}
				/>
			</Col>
			<Col xs={6} className='my-1 py-1'>
				<TimePicker
					value={checkInEnd}
					onChange={(time) => setCheckInEnd(toHHMMSS(time))}
				/>
			</Col>
			<Col xs={6} className='my-1 py-1'>
				<TimePicker
					value={checkOutStart}
					onChange={(time) => setCheckOutStart(toHHMMSS(time))}
				/>
			</Col>
			<Col xs={6} className='my-1 py-1'>
				<TimePicker
					value={checkOutEnd}
					onChange={(time) => setCheckOutEnd(toHHMMSS(time))}
				/>
			</Col>
			<Button className='my-2 mx-2' onClick={submitValues}>
				Submit
			</Button>
		</Row>
	);
};

export default ConfigOrg;
