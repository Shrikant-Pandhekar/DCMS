import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AppointmentBar from "../../components/AppointmentBar/AppointmentBar";
import BlogPost from "../../components/BlogPost/BlogPost";
import Postcmt from "../../components/Postcmt/Postcmt";

function BlogpostFormat(props) {
  let params = useParams();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogsData = async () => {
      const response = await fetch(`http://localhost:8000/api/blog/all`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response) {
        var data = await response.json();
      }
      // console.log(data);
      setBlogs(data);
    };
    getBlogsData();
  }, []);
  // console.log(blogs);
  // if (blogs.find((t) => t.title === params.blogs)) {
  //   console.log("found");
  // }
  // console.log(params.blogs);
  const filterdIdData = blogs.filter((t) => t.title === params.blogs);
  // console.log(filterdIdData);

  if (blogs.find((t) => t.title === params.blogs)) {
    return (
      <>
        <Navbar />
        <BlogPost data={filterdIdData[0]} />
        <AppointmentBar />
        <Postcmt />
        <Footer />
      </>
    );
  } else {
    return <h1>Hello</h1>;
  }
}

export default BlogpostFormat;
