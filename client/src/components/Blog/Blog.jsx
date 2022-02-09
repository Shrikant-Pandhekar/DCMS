import React, { useState, useEffect } from "react";
import Carousel from "react-elastic-carousel";
import "./css/blog.css";
import Bcard from "./Bcard";
const Blog = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
  ];

  const [blogs, setBlogs] = useState([]);

  // console.log(blogs[0]);

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
  if (blogs === " ") {
    return <h1>Hello</h1>;
  } else {
    return (
      <>
        <div className="blogcontainer">
          <div className="bheading">
            <h1>
              Check Our <span className="blue"> Latest Blog </span> Post
            </h1>
          </div>
          <div className="bslider">
            <Carousel
              breakPoints={breakPoints}
              disableArrowsOnEnd={true}
              pagination={true}
              showArrows={true}
              enableAutoPlay={false}
              autoPlaySpeed={3000}
              enableSwipe={false}
            >
              {blogs.map((data) => (
                <Bcard data={data} />
              ))}
            </Carousel>
          </div>
        </div>
      </>
    );
  }
};

export default Blog;
