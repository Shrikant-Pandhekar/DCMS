import React, {useState,useEffect} from "react";
import { Row, Col, Table } from "react-bootstrap";
import Bcard from "./Bcard";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu.json";
const API = "http://localhost:8000/api";



function ListBlog() {

	const [blogs, setBlogs] = useState([])

	useEffect(() => {

		const getAllBlogs = async () => {
	
			try {

				const response = await fetch(`${API}/blog/all`, {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},

				});

				var data;

				if (response) {
					data = await response.json();
					// console.log(data);
				}

				if (!data.error) {
					setBlogs(data)
				} else {
					setBlogs([])
				}

		  } catch (error) {
			  return console.log(error);
		  }
	  	};

	  	getAllBlogs()
  
  	}, [])
	
	return (
		<React.Fragment>
			<Topbar />
			<MainSidebar data={Menu} />
			<PageHeader />
			<div className="main-content">
				<Row>
				<Col md="12">
					<Table className="table table-striped nowrap dataTable no-footer dtr-inline table-responsive">
					<tbody>
						<tr>

							{
								blogs.length > 0 	? 	blogs.map(function(blog, index){

															return (
																<td key={index}>
																	<Bcard {...blog} />
																</td>
															)
														})
													:	null
							}
						</tr>
					</tbody>
					</Table>
				</Col>
				</Row>
			</div>
		</React.Fragment>
	);
}

export default ListBlog;
