import React from 'react';
import { Table } from 'react-bootstrap';
import { BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';

const CustomTable = (props) => {
	let headers = null;

	if (props.type === 'client') {
		console.log(props.elements);
		headers = (
			<>
				<th className='col-1'>#</th>
				{props.elements.map((el, i) => (
					<th key={el + i} className={el === 'Type' ? 'col-4' : 'col-2'}>
						{el}
					</th>
				))}
			</>
		);
	} else if (props.type === 'dept') {
		headers = (
			<>
				<th className='col-1'>#</th>
				<th className='col-4'>Department Name</th>
				<th className='col-6'>Department Description</th>
			</>
		);
	} else if (props.type === 'emp') {
		headers = (
			<>
				<th className='col-1'>#</th>
				<th className='col-2'>Name</th>
				<th className='col-2'>Phone</th>
				<th className='col-2'>ID Type</th>
				<th className='col-2'>ID Proof</th>
				<th className='col-2'>Role</th>
			</>
		);
	}

	return (
		<div className='px-4 table-responsive userTable'>
			<Table striped>
				<thead>
					<tr className='d-flex'>
						{headers}
						<th className='col-1'></th>
					</tr>
				</thead>
				<tbody className='dataTable'>
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
									<td className='col-1'>{i + 1}</td>
									<td className='col-2'>{r.Name}</td>
									<td className='col-4'>{r.orgType}</td>
									<td className='col-2'>{r.contact}</td>
									<td className='col-2'>{r.staffcount}</td>
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
