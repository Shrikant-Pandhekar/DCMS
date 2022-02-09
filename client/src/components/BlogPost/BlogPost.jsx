import React from "react";
import "./css/blogpost.css";

function BlogPost(data) {
  console.log(data);
  return (
    <div className="bpcontents">
      <div className="bpmatter">
        <img src={data.data.imgurl} alt="Blog_img" className="blgimg" />
        <div className="blginfo">
          <div className="blgdetails">
            <h6>
              <i class="fa fa-user" aria-hidden="true"></i> {data.data.author}
            </h6>
            <h6>
              <i class="fa fa-calendar" aria-hidden="true"></i>{" "}
              {data.data.createdAt.substr(0, 10)}
            </h6>
          </div>
          <h1>{data.data.title}</h1>
          <p>{data.data.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
