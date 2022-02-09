import React from 'react'

const AdminDashboard = () => {


    
    return (
		<React.Fragment>
			<Topbar />
			<MainSidebar data={Menu} />
			<PageHeader />
			<div className="main-content">
			<div>
				<Row className="w-no-padding margin-b-30">
				<Col md="4">
					<div className="widget  bg-light">
					<Row className="row-table ">
						<div className="margin-b-50">
						<h2 className="margin-b-5">Patient</h2>
						<p className="text-muted">Total Number</p>
						<span className="float-right text-primary widget-r-m">
							37859
						</span>
						</div>
					</Row>
					</div>
				</Col>
				<Col md="4">
					<div className="widget  bg-light">
					<Row className="row-table ">
						<div className="margin-b-50">
						<h2 className="margin-b-5">Appointments</h2>
						<p className="text-muted">Total Appointments</p>
						<span className="float-right text-indigo widget-r-m">
							1758
						</span>
						</div>
					</Row>
					</div>
				</Col>
				<Col md="4">
					<div className="widget  bg-light">
					<Row className="row-table ">
						<div className="margin-b-50">
						<h2 className="margin-b-5">Pending</h2>
						<p className="text-muted">Total Pending</p>
						<span className="float-right text-success widget-r-m">
							1385
						</span>
						</div>
					</Row>
					</div>
				</Col>
				</Row>
				<h1>Today'xds Appointment</h1>
				<br />
				<Row className="w-no-padding margin-b-30">
				<Col md="12">
					<table
					id="datatable"
					className="table table-striped nowrap dataTable no-footer dtr-inline table-responsive"
					width="100%"
					>
					<thead>
						<tr>
						<th>
							<strong>ID</strong>
						</th>
						<th>
							<strong>Name</strong>
						</th>
						<th>
							<strong>Phone Number</strong>
						</th>
						<th>
							<strong>Gender</strong>
						</th>
						<th>
							<strong>Date</strong>
						</th>
						<th>
							<strong>Time</strong>
						</th>
						<th>
							<strong>Action</strong>
						</th>
						</tr>
					</thead>
					<tbody>
						<tr>
						<td>1425</td>
						<td>
							<img
							alt="user"
							className="media-box-object rounded-circle mr-2"
							src="/assets/img/avtar-2.png"
							width={30}
							/>
							John Doe
						</td>
						<td>7028357194</td>
						<td>Male</td>
						<td>15/07/2018</td>
						<td>07:30:00 PM</td>
						<td className="text-center">
							<span className="label label-success">Completed</span>
						</td>
						</tr>
						<tr>
						<td>1426</td>
						<td>
							<img
							alt="user"
							className="media-box-object rounded-circle mr-2"
							src="/assets/img/avtar-1.png"
							width={30}
							/>
							Govinda Doe
						</td>
						<td>7028357194</td>
						<td>Male</td>
						<td>15/07/2018</td>
						<td>07:30:00 PM</td>
						<td className="text-center">
							<span className="label label-success">Completed</span>
						</td>
						</tr>
						<tr>
						<td>1427</td>
						<td>
							<img
							alt="user"
							className="media-box-object rounded-circle mr-2"
							src="/assets/img/avtar-3.png"
							width={30}
							/>
							Megan Doe
						</td>
						<td>7028357194</td>
						<td>Male</td>
						<td>15/07/2018</td>
						<td>07:30:00 PM</td>
						<td className="text-center">
							<span className="label label-success">Completed</span>
						</td>
						</tr>
						<tr>
						<td>1428</td>
						<td>
							<img
							alt="user"
							className="media-box-object rounded-circle mr-2"
							src="/assets/img/avtar-4.png"
							width={30}
							/>
							Hritic Doe
						</td>
						<td>7028357194</td>
						<td>Male</td>
						<td>15/07/2018</td>
						<td>07:30:00 PM</td>
						<td className="text-center">
							<span className="label label-success">Completed</span>
						</td>
						</tr>
						<tr>
						<td>1434</td>
						<td>
							<img
							alt="user"
							className="media-box-object rounded-circle mr-2"
							src="/assets/img/avtar-1.png"
							width={30}
							/>
							John Doe
						</td>
						<td>7028357194</td>
						<td>Male</td>
						<td>15/07/2018</td>
						<td>07:30:00 PM</td>
						<td className="text-center">
							<span className="label label-danger">Pending</span>
						</td>
						</tr>
					</tbody>
					</table>
				</Col>
				</Row>
			</div>
			</div>
		</React.Fragment>
	);
}

export default AdminDashboard;
