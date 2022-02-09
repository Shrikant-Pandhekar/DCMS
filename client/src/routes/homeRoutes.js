import React from "react";
import { Route } from "react-router-dom";

import HomePage from "./../pages/Home/HomePage/HomePage";
import AboutPage from "./../pages/Home/AboutPage/AboutPage";
import SignupPage from "./../pages/Home/SignupPage/SignupPage";
import SigninPage from "./../pages/Home/SigninPage/SigninPage";
import TreatmentServiceFormat from "../pages/Home/treatmentserviceformat";
import BlogpostFormat from "../pages/Home/blogpostformat";
import Page404 from "../pages/page-error/page-404";

const HomeRoutes = [
  <Route exact path={`/`} element={<HomePage />} key={"111"} />,
  <Route exact path={`/about`} element={<AboutPage />} key={"112"} />,
  <Route exact path={`/signup`} element={<SignupPage />} key={"113"} />,
  <Route exact path={`/signin`} element={<SigninPage />} key={"114"} />,
  <Route
    exact
    path={`/blog/:blogs`}
    element={<BlogpostFormat />}
    key={"115"}
  />,
  <Route
    exact
    path={`/treatment/:treatments`}
    element={<TreatmentServiceFormat />}
    key={"116"}
  />,
  <Route exact path="*" element={<Page404 />} key="error404" />,
];

export default HomeRoutes;
