import React, { useState, useEffect } from "react";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu.json";
import { isAuthenticated } from "../../../auth/index";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api";




function AddBlog() {
  const [details, setDetails] = useState({
    title: "",
    author: "",
    description: "",
    imgurl: "",
  });
const [success, setSuccess] = useState(false);
  const [successmessege, setSuccessmessege] = useState("");
  const navigate = useNavigate();
  const { title, author, description, imgurl } = details;

  console.log(details);

  const inputEvents = (event) => {
    const { name, value } = event.target;

    setDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = async (event) => {
    try {
      const { user, token } = isAuthenticated();

      event.preventDefault();

      var body = JSON.stringify(details);

      console.log(body);

      const response = await fetch(`${API}/blog/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });

      if (response) {
        var data = await response.json();
        if(data.message){
           setSuccess(true);
          setSuccessmessege(data.message);
          navigate("/doctor/listblog");
        }
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "Blog Added !",
        icon: "success",
        text: successmessege,
      });
    }
  }, [success, successmessege]);

  return (
    <>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
        <div className="widget  bg-light">
          <form action="" method="post" onSubmit={onSubmit}>
            <div className="form-group">
              <label>Blog Name</label>
              <input
                className="form-control"
                type="text"
                name="title"
                id="title"
                onChange={inputEvents}
              />
            </div>
            <div className="form-group">
              <label>Blog Image Url</label>
              <div>
                <input className="form-control" type="text" type="text"
                name="imgurl"
                id="imgurl"
                onChange={inputEvents} />
                
              </div>
            </div>
            <div className="form-group">
              <label>Blog Description</label>
              <textarea
                cols="20"
                rows="25"
                className="form-control"
                name="description"
                id="description"
                onChange={inputEvents}
              ></textarea>
            </div>
            <div className="m-t-20 text-center">
              <button className="btn btn-primary submit-btn" onClick={onSubmit}>
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddBlog;
