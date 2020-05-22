import React from 'react';
import { Table } from 'react-bootstrap';

const headers = [
	'Name',
	'Client ID',
	'Contact Person',
	'Email',
	'Mobile',
	'Status',
	'Action',
];

const data = [
	[
		'Carlson Tech',
		'CLT-0008',
		'Betty Carlson',
		'bettycarlson@example.com',
		'9876543210',
		'Inactive',
		'Inactive',
	],
	[
		'Carlson Tech',
		'CLT-0008',
		'Betty Carlson',
		'bettycarlson@example.com',
		'9876543210',
		'Inactive',
	],
	[
		'Carlson Tech',
		'CLT-0008',
		'Betty Carlson',
		'bettycarlson@example.com',
		'9876543210',
		'Inactive',
		'Inactive',
	],
];

const CustomTable = () => {
	return (
		<div className="px-4 table-responsive">
			<Table striped>
				<thead>
					<tr>
						{headers.map((el, i) => (
							<th key={el + i}>{el}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((r, i) => (
						<tr key={r + i}>
							{r.map((c, i) => (
								<td key={c + i}>{c}</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default CustomTable;
