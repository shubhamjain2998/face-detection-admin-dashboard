import React from 'react';
import { Container, Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

let dummy = [];
for (let i = 1; i <= 31; i++) {
	dummy.push(i);
}

const AttendanceAdmin = () => {
	const employees = useSelector((state) => state.acc.list);
	return (
		<Container fluid>
			<Row>
				<Col>
					<div className='table-responsive'>
						<Table>
							<thead>
								<tr>
									<th>Employee</th>
									{dummy.map((d) => (
										<th>{d}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{employees.map((emp) => (
									<tr>
										<td>{emp.username}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default AttendanceAdmin;
