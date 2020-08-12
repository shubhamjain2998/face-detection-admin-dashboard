import React, { useMemo, useState } from 'react';
import { Table, Badge } from 'react-bootstrap';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import moment from 'moment';

const UserTable = (props) => {
	const getRoles = (user) => {
		if (user.is_superuser) {
			return (
				<Badge variant='warning' className='user-badge'>
					Super Admin
				</Badge>
			);
		} else if (user.is_staff && !user.is_superuser) {
			return (
				<Badge variant='primary' className='user-badge'>
					Client
				</Badge>
			);
		} else {
			return (
				<Badge variant='success' className='user-badge'>
					Employee
				</Badge>
			);
		}
	};

	const useSortableData = (items, config = null) => {
		const [sortConfig, setSortConfig] = useState(config);

		console.log(sortConfig);
		const sortedItems = useMemo(() => {
			let sortableItems = [...items];

			if (sortConfig != null) {
				sortableItems.sort((a, b) => {
					if (sortConfig.key === 'role') {
						if (
							(b.is_superuser && a.is_staff) ||
							(b.is_staff && !a.is_superuser && !a.is_staff)
						) {
							return sortConfig.direction === 'ascending' ? -1 : 1;
						}
						if (
							(a.is_superuser && b.is_staff) ||
							(a.is_staff && !b.is_superuser && !b.is_staff)
						) {
							return sortConfig.direction === 'ascending' ? 1 : -1;
						}
						return 0;
					} else {
						if (a[sortConfig.key] < b[sortConfig.key]) {
							return sortConfig.direction === 'ascending' ? -1 : 1;
						}
						if (a[sortConfig.key] > b[sortConfig.key]) {
							return sortConfig.direction === 'ascending' ? 1 : -1;
						}
						return 0;
					}
				});
			}
			return sortableItems;
		}, [items, sortConfig]);

		const requestSort = (key) => {
			let direction = 'ascending';
			if (
				sortConfig &&
				sortConfig.key === key &&
				sortConfig.direction === 'ascending'
			) {
				direction = 'descending';
			}
			setSortConfig({ key, direction });
		};

		return { items: sortedItems, requestSort, sortConfig };
	};

	const { items, requestSort, sortConfig } = useSortableData(props.users);

	return (
		<div>
			<div className='table-responsive userTable px-3 my-2'>
				<Table>
					<tbody className='dataTable'>
						<tr className='d-flex'>
							{/* <td>#</td> */}
							<td className='col-3' onClick={() => requestSort('email')}>
								User
								<span className='mx-1'>
									{sortConfig &&
									sortConfig.key === 'email' &&
									sortConfig.direction === 'ascending' ? (
										<BsArrowDown size='1.5em' />
									) : (
										<BsArrowUp size='1.5em' />
									)}
								</span>
							</td>
							<td className='col-3' onClick={() => requestSort('role')}>
								Role
								<span className='mx-1'>
									{sortConfig &&
									sortConfig.key === 'role' &&
									sortConfig.direction === 'ascending' ? (
										<BsArrowDown size='1.5em' />
									) : (
										<BsArrowUp size='1.5em' />
									)}
								</span>
							</td>
							<td className='col-3' onClick={() => requestSort('date_joined')}>
								Joined
								<span className='mx-1'>
									{sortConfig &&
									sortConfig.key === 'date_joined' &&
									sortConfig.direction === 'ascending' ? (
										<BsArrowDown size='1.5em' />
									) : (
										<BsArrowUp size='1.5em' />
									)}
								</span>
							</td>
							<td className='col-3' onClick={() => requestSort('last_login')}>
								Last Login
								<span className='mx-1'>
									{sortConfig &&
									sortConfig.key === 'last_login' &&
									sortConfig.direction === 'ascending' ? (
										<BsArrowDown size='1.5em' />
									) : (
										<BsArrowUp size='1.5em' />
									)}
								</span>
							</td>
						</tr>
						{items.map((r, i) => (
							<tr key={r.id} className='d-flex'>
								{/* <td>{i + 1}</td> */}
								<td className='col-3' style={{ overflowWrap: 'anywhere' }}>
									{r.email}
								</td>
								<td className='col-3'>{getRoles(r)}</td>
								<td className='col-3'>
									{moment(r.date_joined).format(' h:mm a, DD MMM YYYY')}{' '}
								</td>
								<td className='col-3'>
									{r.last_login
										? moment(r.last_login).format(' h:mm a, DD MMM YYYY')
										: 'N/A'}{' '}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default UserTable;
