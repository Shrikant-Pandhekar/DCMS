import React from "react";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu.json";
function EditBlog() {
  return (
    <>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
        <div className="widget  bg-light">
          <form>
            <div className="form-group">
              <label>Blog Name</label>
              <input className="form-control" type="text" />
            </div>
            <div className="form-group">
              <label>Blog Images</label>
              <div>
                <input className="form-control" type="file" />
                <small className="form-text text-muted">
                  Max. file size: 50 MB. Allowed images: jpg, gif, png. Maximum
                  10 images only.
                </small>
              </div>
            </div>
            <div className="form-group">
              <label>Blog Description</label>
              <textarea cols="20" rows="25" className="form-control"></textarea>
            </div>

            <div className="m-t-20 text-center">
              <button className="btn btn-primary submit-btn">Publish Blog</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditBlog;
