import React from "react";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu.json";
function Ansqto() {
  return (
    <>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
        <div className="widget  bg-light">
          <form>
            <div className="form-group">
              <label>Patient Name</label>
              <input className="form-control" type="text" disabled />
            </div>
            <div className="form-group">
              <label>Question</label>
              <input className="form-control" type="text" disabled />
            </div>

            <div className="form-group">
              <label>Answer</label>
              <textarea cols="20" rows="5" className="form-control"></textarea>
            </div>

            <div className="m-t-20 text-center">
              <button className="btn btn-primary submit-btn">Answer</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Ansqto;
