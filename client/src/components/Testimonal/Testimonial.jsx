import React from "react";
import "./css/testi.css";
import Tcard from "./Tcard";
import Carousel from "react-elastic-carousel";

const Testimonial = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
  ];
  return (
    <>
      <div className="testcontainer">
        <div className="testheading">
          <h1>
            See What Our <span className="blue"> Happy Patients </span> Say
          </h1>
          <h6 className="blue">It's why we do what we do.</h6>
        </div>
        <div className="slider">
          <Carousel
            breakPoints={breakPoints}
            disableArrowsOnEnd={true}
            pagination={true}
            showArrows={true}
            enableAutoPlay={true}
            autoPlaySpeed={3000}
            enableSwipe={false}
          >
            <Tcard
              tname="Shrikant Pandhekar"
              tdate="3 Month Ago"
              treview=" I was very impressed with Dento Dental today as a new patient. They
          ran on time and were so friendly. I really enjoyed talking to Dr .He
          did a great job filling my cavities. That is the part I fear the most
          and he made it virtually painless."
            />
            <Tcard
              tname="Shrikant Pandhekar"
              tdate="3 Month Ago"
              treview=" I was very impressed with Dento Dental today as a new patient. They
          ran on time and were so friendly. I really enjoyed talking to Dr .He
          did a great job filling my cavities. That is the part I fear the most
          and he made it virtually painless."
            />
            <Tcard
              tname="Shrikant Pandhekar"
              tdate="3 Month Ago"
              treview=" I was very impressed with Dento Dental today as a new patient. They
          ran on time and were so friendly. I really enjoyed talking to Dr .He
          did a great job filling my cavities. That is the part I fear the most
          and he made it virtually painless."
            />
            <Tcard
              tname="Shrikant Pandhekar"
              tdate="3 Month Ago"
              treview=" I was very impressed with Dento Dental today as a new patient. They
          ran on time and were so friendly. I really enjoyed talking to Dr .He
          did a great job filling my cavities. That is the part I fear the most
          and he made it virtually painless."
            />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
