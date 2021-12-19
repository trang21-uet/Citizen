import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ProtectedRoute } from "../auth/AuthProvider";
import Header from "../component/shared/Header";
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle";

const Layout = () => {
  useEffect(() => {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltips = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });
    window.onresize = window.onload = () => {
      if (window.innerWidth >= 992) {
        tooltips.forEach((element) => {
          element.enable();
        });
      } else {
        tooltips.forEach((element) => {
          element.disable();
        });
      }
    };
  });
  return (
    <ProtectedRoute>
      <Header></Header>
      <div className="">
        <Outlet></Outlet>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
