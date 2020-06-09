import React from 'react';
import { Table, Badge } from 'react-bootstrap';
import { BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';

const CustomTable = (props) => {
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
				<td className='col-4'>Name</td>
				<td className='col-4'>Type</td>
				{/* <td className='col-2'>Contact</td> */}
				<td className='col-3'>Staff Count</td>
			</>
		);
	} else if (props.type === 'dept') {
		headers = (
			<>
				<td className='col-1'>#</td>
				<td className='col-4'>Name</td>
				<td className='col-6'>Description</td>
			</>
		);
	} else if (props.type === 'emp') {
		headers = (
			<>
				<td className='col-1'>#</td>
				<td className='col-2'>Name</td>
				<td className='col-2'>Phone</td>
				<td className='col-2'>ID Type</td>
				<td className='col-2'>ID Proof</td>
				<td className='col-2'>Role</td>
			</>
		);
	}

	return (
		<div className='px-4 table-responsive userTable'>
			<Table>
				<tbody className='dataTable'>
					<tr className='d-flex'>
						{headers}
						<td className='col-1'></td>
					</tr>
					{props.values.map((r, i) => {
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
									<td className='col-1'>{i + 1}</td>
									<td className='col-2'>{r.firstName + ' ' + r.lastName}</td>
									<td className='col-2'>{r.phone}</td>
									<td className='col-2'>{r.idType}</td>
									<td className='col-2'>{r.idProof}</td>
									<td className='col-2'>{r.role}</td>
									<td>
										<BsThreeDotsVertical />
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
