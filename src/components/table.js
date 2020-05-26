import React from 'react';
import { Table } from 'react-bootstrap';

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
	}

	return (
		<div className='px-4 table-responsive'>
			<Table striped>
				<thead>
					<tr className='d-flex'>
						{headers}
						<th className='col-1'>Action</th>
					</tr>
				</thead>
				<tbody>
					{props.values.map((r, i) => {
						if (props.type === 'dept') {
							return (
								<tr key={r + i} className='d-flex'>
									<td className='col-1'>{i + 1}</td>
									<td className='col-4'>{r.DeptName}</td>
									<td className='col-6'>{r.Description}</td>
									<td className='col-1'>-</td>
								</tr>
							);
						} else {
							return (
								<tr key={r + i} className='d-flex'>
									<td className='col-1'>{i + 1}</td>
									<td className='col-2'>{r.Name}</td>
									<td className='col-4'>{r.orgType}</td>
									<td className='col-2'>{r.contact}</td>
									<td className='col-2'>{r.staffcount}</td>
								</tr>
							);
						}
					})}
				</tbody>
			</Table>
		</div>
	);
};

export default CustomTable;
