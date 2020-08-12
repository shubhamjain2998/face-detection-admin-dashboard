import React, { useState, useMemo } from 'react';
import { Table, Badge, Image } from 'react-bootstrap';
import {
	BsThreeDotsVertical,
	BsTrash,
	BsArrowDown,
	BsArrowUp,
} from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import defaultImg from '../assets/user.svg';

const CustomTable = (props) => {
	const useSortableData = (items, config = null) => {
		const [sortConfig, setSortConfig] = useState(config);

		console.log(sortConfig);
		const sortedItems = useMemo(() => {
			let sortableItems = [...items];

			if (sortConfig != null) {
				sortableItems.sort((a, b) => {
					if (a[sortConfig.key] < b[sortConfig.key]) {
						return sortConfig.direction === 'ascending' ? 1 : -1;
					}
					if (a[sortConfig.key] > b[sortConfig.key]) {
						return sortConfig.direction === 'ascending' ? -1 : 1;
					}
					return 0;
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

	const { items, requestSort, sortConfig } = useSortableData(props.values);

	let headers = null;

	if (props.type === 'client') {
		// console.log(props.elements);
		headers = (
			<>
				{/* {props.elements.map((el, i) => (
					// <th key={el + i} className={el === 'Type' ? 'col-4' : 'col-2'}>
					<th key={el + i} className={el === 'Type' ? 'col-4' : 'col-2'}>
						{el}
					</th>
				))} */}
				<td className='col-4' onClick={() => requestSort('Name')}>
					Name
					<span className='mx-1'>
						{sortConfig &&
						sortConfig.key === 'Name' &&
						sortConfig.direction === 'ascending' ? (
							<BsArrowDown size='1.5em' />
						) : (
							<BsArrowUp size='1.5em' />
						)}
					</span>
				</td>
				<td className='col-4' onClick={() => requestSort('orgType')}>
					Type
					<span className='mx-1'>
						{sortConfig &&
						sortConfig.key === 'orgType' &&
						sortConfig.direction === 'ascending' ? (
							<BsArrowDown size='1.5em' />
						) : (
							<BsArrowUp size='1.5em' />
						)}
					</span>
				</td>
				<td className='col-3' onClick={() => requestSort('staffcount')}>
					Staff Count
					<span className='mx-1'>
						{sortConfig &&
						sortConfig.key === 'staffcount' &&
						sortConfig.direction === 'ascending' ? (
							<BsArrowDown size='1.5em' />
						) : (
							<BsArrowUp size='1.5em' />
						)}
					</span>
				</td>
			</>
		);
	} else if (props.type === 'dept') {
		headers = (
			<>
				<td className='col-1'>#</td>
				<td className='col-4' onClick={() => requestSort('DeptName')}>
					Name
					<span className='mx-1'>
						{sortConfig &&
						sortConfig.key === 'DeptName' &&
						sortConfig.direction === 'ascending' ? (
							<BsArrowDown size='1.5em' />
						) : (
							<BsArrowUp size='1.5em' />
						)}
					</span>
				</td>
				<td className='col-6' onClick={() => requestSort('Description')}>
					Description
					<span className='mx-1'>
						{sortConfig &&
						sortConfig.key === 'Description' &&
						sortConfig.direction === 'ascending' ? (
							<BsArrowDown size='1.5em' />
						) : (
							<BsArrowUp size='1.5em' />
						)}
					</span>
				</td>
			</>
		);
	} else if (props.type === 'emp') {
		headers = (
			<>
				<td className='col-1'>ID</td>
				<td className='col-4' onClick={() => requestSort('firstName')}>
					Name
					<span className='mx-1'>
						{sortConfig &&
						sortConfig.key === 'firstName' &&
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
				<td className='col-3' onClick={() => requestSort('phone')}>
					Phone
					<span className='mx-1'>
						{sortConfig &&
						sortConfig.key === 'phone' &&
						sortConfig.direction === 'ascending' ? (
							<BsArrowDown size='1.5em' />
						) : (
							<BsArrowUp size='1.5em' />
						)}
					</span>
				</td>
				{/* <td className='col-2' onClick={() => requestSort('idType')}>
					ID Type
					<span className='mx-1'>
						{sortConfig &&
						sortConfig.key === 'idType' &&
						sortConfig.direction === 'ascending' ? (
							<BsArrowDown size='1.5em' />
						) : (
							<BsArrowUp size='1.5em' />
						)}
					</span>
				</td>
				<td className='col-2' onClick={() => requestSort('idProof')}>
					ID Proof
					<span className='mx-1'>
						{sortConfig &&
						sortConfig.key === 'idProof' &&
						sortConfig.direction === 'ascending' ? (
							<BsArrowDown size='1.5em' />
						) : (
							<BsArrowUp size='1.5em' />
						)}
					</span>
				</td> */}
				
			</>
		);
	}

	return (
		<div className='mx-2 table-responsive userTable'>
			<Table>
				<tbody className='dataTable'>
					<tr className='d-flex'>
						{headers}
						<td className='col-1'></td>
					</tr>
					{items.map((r, i) => {
						if (props.type === 'dept') {
							return (
								<tr key={r + i} className='d-flex'>
									<td className='col-1'>{i + 1}</td>
									<td className='col-4'>{r.DeptName}</td>
									<td className='col-6'>{r.Description}</td>
									<td>
										<span style={{ cursor: 'pointer' }}>
											<MdEdit
												className='mx-2 text-primary'
												onClick={() => props.onEdit(r)}
											/>
											<BsTrash
												className='mx-2 text-danger'
												onClick={() => props.onDelete(r)}
											/>
										</span>
									</td>
								</tr>
							);
						} else if (props.type === 'client') {
							return (
								<tr key={r + i} className='d-flex'>
									{/* <td className='col-1'>{i + 1}</td> */}
									<td className='col-4'>{r.Name}</td>
									<td className='col-4 text-truncate'>
										<Badge pill variant='warning'>
											{r.orgType}
										</Badge>
									</td>
									{/* <td className='col-2'>{r.contact}</td> */}
									<td className='col-3'>{r.staffcount}</td>
									<td>
										<BsThreeDotsVertical />
									</td>
								</tr>
							);
						} else if (props.type === 'emp') {
							return (
								<tr key={r + i} className='d-flex'>
									<td className='col-1'>{r.empId}</td>
									<td className='col-4'>
										<div className='emp-table-profile'>
											<Image
												src={r.profileImg ? r.profileImg : defaultImg}
												alt
												roundedCircle
											/>
											<div>
												<h6>{r.firstName + ' ' + r.lastName}</h6>
												<h6 className='text-truncate'>{r.emailId}</h6>
											</div>
										</div>
									</td>
									<td className='col-3 font-weight-bold'>{r.role}</td>
									<td className='col-3' style={{ overflowWrap: 'anywhere' }}>
										{r.phone}
									</td>
									{/* <td className='col-2'>{r.idType}</td>
									<td className='col-2' style={{ overflowWrap: 'anywhere' }}>
										{r.idProof}
									</td> */}
									<td>
									<span style={{ cursor: 'pointer' }}>
											<MdEdit size='1.5em'
												className='mx-2 text-primary'
												// onClick={() => props.onEdit(r)}
											/>
											<BsTrash size='1.5em'
												className='mx-2 text-danger'
												// onClick={() => props.onDelete(r)}
											/>
										</span>
									</td>
								</tr>
							);
						} else {
							return '';
						}
					})}
				</tbody>
			</Table>
		</div>
	);
};

export default CustomTable;
