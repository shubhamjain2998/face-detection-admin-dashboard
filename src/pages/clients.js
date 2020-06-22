import React, { useState, useEffect } from 'react';
import ClientCard from '../components/Cards/clientCard';
import Heading from '../components/heading';
// import john from '../assets/avatar-02.jpg';
import { Row, Col, Button, Container, Tab, Nav } from 'react-bootstrap';
import { BsPlus, BsGrid3X3Gap } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import CustomModal from '../components/modal';
import CustomTable from '../components/table';
import axios from '../axios-faceDet';
import OrganizationForm from '../components/Forms/orgForm';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/loader';
import * as actions from '../store/actions/index';
import CustomForm from '../components/Forms/customForm';

const Clients = (props) => {
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const [orgs, setOrgs] = useState(null);
	const [fetchedOrgs, setFetchedOrgs] = useState(false);
	// const [filters, setFilters] = useState(null);

	const user = useSelector((state) => state.user);
	const storedOrgs = useSelector((state) => state.org.list);

	const dispatch = useDispatch();

	const clientTemplate = {
		pk: '',
		Name: '',
		orgType: '',
		contact: '',
		staffcount: '',
		logo: '',
	};

	useEffect(() => {
		if (!fetchedOrgs) {
			setLoading(true);
			axios
				.get('attendance/api/org')
				.then((res) => {
					// console.log(res.data);
					dispatch(actions.fetchOrgs(res.data));
					setOrgs(res.data);
					setFetchedOrgs(true);
					setLoading(false);
				})
				.catch((err) => {
					// console.log(err.response.data);
					setLoading(false);
				});
		}
	}, [fetchedOrgs, dispatch]);

	let rightSidebarClasses = 'right-sidebar client-filter ';

	if (user.rightSidebar) {
		rightSidebarClasses = rightSidebarClasses.concat('show-right-sidebar');
	} else {
		rightSidebarClasses = rightSidebarClasses.concat('hide-right-sidebar');
	}
	// console.log(rightSidebarClasses);

	const onDeleteHandler = (id) => {
		axios
			.delete('/attendance/api/org/' + id + '/')
			.then((res) => {
				// console.log(res.data);
				setFetchedOrgs(false);
			})
			.catch((err) => console.log(err.response.data));
	};

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const addingDone = (newOrg) => {
		// const temp = orgs;
		// temp.push(newOrg);
		// setOrgs(temp);
		setShow(false);
		setFetchedOrgs(false);
	};

	const filterElements = [
		{
			name: 'name',
			type: 'text',
			label: 'Organization Name',
			value: '',
			col: 12,
		},
		{
			name: 'orgType',
			type: 'text',
			label: 'Organization Type',
			value: '',
			col: 12,
		},
		{
			name: 'phone',
			type: 'number',
			label: 'Contact Number',
			value: '',
			col: 12,
		},
		{
			name: 'staffCount',
			type: 'text',
			label: 'Total Staff',
			value: '',
			col: 12,
		},
	];

	const onSubmitFilters = (values) => {
		// console.log(values);
		// setFilters(values);
		if (storedOrgs) {
			const filteredOrgs = storedOrgs.filter((org) => {
				return (
					org.Name.toLowerCase().includes(values.name.toLowerCase()) &&
					org.orgType.toLowerCase().includes(values.orgType.toLowerCase()) &&
					org.contact.includes(values.phone.toString()) &&
					parseInt(org.staffcount) >= values.staffCount
				);
			});
			if (user.rightSidebar) {
				dispatch(actions.toggleRightSidebar());
			}
			setOrgs(filteredOrgs);
		}
	};

	const tableElements = ['Name', 'Type', 'Contact Number', 'Staff Count'];

	return (
		<Container fluid>
			<Row className='position-relative'>
				<Col xl={10} md={12}>
					<Row>
						<Col lg={9}>
							<Heading name='Clients' link='client' />
						</Col>
						<Col lg={3} className='d-flex justify-content-center align-items-center'>
							<Button variant='primary' className='px-2' onClick={handleShow}>
								<span className='pr-1'>
									<BsPlus />
								</span>
								Add Client
							</Button>
						</Col>
					</Row>

					<Tab.Container defaultActiveKey='card'>
						<Row className='client-tabs'>
							<Nav>
								<Nav.Item>
									<Nav.Link eventKey='card'>
										<span className='px-2 makeLink'>
											<BsGrid3X3Gap />
										</span>
										<span>Segment</span>
									</Nav.Link>
								</Nav.Item>

								<Nav.Item>
									<Nav.Link eventKey='table'>
										<span className='px-2 makeLink'>
											<FaBars />
										</span>
										<span>ListView</span>
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Row>
						<Row>
							<Col sm={12}>
								<Tab.Content>
									<Tab.Pane eventKey='card'>
										{loading && <Loader loading={loading} />}
										<Row>
											{!loading &&
												orgs &&
												orgs.map((org, i) => (
													<Col key={org.Name + i} xs={6} md={4} xl={3} className='my-3'>
														<ClientCard client={org} onDelete={onDeleteHandler}></ClientCard>
													</Col>
												))}
										</Row>
									</Tab.Pane>
									<Tab.Pane eventKey='table'>
										{!loading && orgs && (
											<CustomTable elements={tableElements} values={orgs} type='client' />
										)}
									</Tab.Pane>
								</Tab.Content>
							</Col>
						</Row>
					</Tab.Container>
					<CustomModal show={show} onClose={handleClose} heading='Add Client'>
						<OrganizationForm
							add
							values={clientTemplate}
							onEditingDone={addingDone}
						/>
					</CustomModal>
				</Col>
				<Col xl={2} md={12} className={rightSidebarClasses}>
					<p>filters</p>
					<div className='applied-filters'></div>

					<CustomForm
						filters
						elements={filterElements}
						handleSubmit={onSubmitFilters}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default Clients;
