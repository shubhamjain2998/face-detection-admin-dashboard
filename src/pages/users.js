import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Heading from '../components/heading';
import * as actions from '../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const Users = () => {
	const [userFetched, setUserFetched] = useState(false);

	const dispatch = useDispatch();
	const users = useSelector((state) => state.user.list);

	useEffect(() => {
		if (!userFetched) {
			dispatch(actions.fetchUsers());
		}
	}, [userFetched, dispatch]);

	return (
		<Container fluid>
			<Row>
				<Col lg={9}>
					<Heading name='Users' link='users' />
				</Col>
			</Row>

			<Row className='mt-3'>
				<Col md={{ span: 10, offset: 1 }} xs={12}>
					<div className='table-responsive userTable'>
						<Table striped>
							<thead>
								<tr>
									<th>#</th>
									<th>Active Users</th>
									<th>Date Joined</th>
									<th>Last Login</th>
								</tr>
							</thead>
							<tbody>
								{users.map((r, i) => (
									<tr key={r.id}>
										<td>{i + 1}</td>
										<td style={{ overflowWrap: 'anywhere' }}>{r.email}</td>
										<td>{moment(r.date_joined).format(' h:mm a, DD MMM YYYY')} </td>
										<td>
											{r.last_login
												? moment(r.last_login).format(' h:mm a, DD MMM YYYY')
												: 'N/A'}{' '}
										</td>
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

export default Users;


//TODO: Add Pagination