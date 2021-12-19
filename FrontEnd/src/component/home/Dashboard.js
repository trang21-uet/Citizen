import React, { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import img1 from "../../assets/img/hao1.jpg";
import img2 from "../../assets/img/hao2.jpeg";
import img3 from "../../assets/img/hao3.png";

const Dashboard = () => {
  const auth = useAuth();
  useEffect(() => {
    document.title = "Citizen - Trang chủ";
  });
  return (
    <div id="fadeslide" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={img1} className="img-fluid w-100 " alt="#"/>
            <div className="carousel-caption d-none d-md-block text-dark">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
        </div>
        <div className="carousel-item">
          <img src={img2} className="img-fluid w-100  " alt="#"/>
          <div className="carousel-caption d-none d-md-block text-dark">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div className="carousel-item ">
          <img src={img3} className="img-fluid w-100 " alt="#"/>
          <div className="carousel-caption d-none d-md-block text-dark">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#fadeslide" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#fadeslide" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Dashboard;
