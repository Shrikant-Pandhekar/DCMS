import React, { useState } from "react";
import "./css/postcmt.css";

function Postcmt() {
  const [name, setName] = useState({
    fname: "",
    email: "",
    comment: "",
  });

  const inputEvents = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);

    const { name, value } = event.target;

    setName((prev) => {
      console.log(prev);
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    alert("Form Submited");
  };
  return (
    <div className="postcmtcontainer">
      <div className="postcontent">
        <h1>Leave Comment</h1>
        <form action="" method="post" onSubmit={onSubmit}>
          <div className="twoblock">
            <input
              type="text"
              name="fname"
              id=""
              placeholder="Name"
              autoComplete="off"
              onChange={inputEvents}
              value={name.fname}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="off"
              onChange={inputEvents}
              value={name.email}
            />
          </div>
          <div className="oneblock">
            <textarea
              name="comment"
              id="comment"
              cols="20"
              placeholder="Leave a Comment"
              onChange={inputEvents}
              value={name.comment}
            ></textarea>
          </div>
          <button type="submit">Post Comment</button>
        </form>
      </div>
    </div>
  );
}

export default Postcmt;
