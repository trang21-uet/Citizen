import React, { useEffect } from "react";
import img1 from "../../assets/img/hao1.jpg";
import img2 from "../../assets/img/hao2.jpeg";
import img3 from "../../assets/img/hao3.png";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Citizen - Trang chủ";
  });
  return (
    <div
      id="fadeslide"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <SlideItem
          className="active"
          src={img1}
          label="Citizen"
          desc="Hệ thống điều tra dân số"
        />
        <SlideItem
          src={img2}
          label="React"
          desc="A JavaScript library for building user interfaces"
        />
        <SlideItem
          src={img3}
          label="Laravel"
          desc="The PHP Framework for Web Artisans"
        />
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#fadeslide"
        data-bs-slide="prev"
      >
        <span
          className="bi bi-chevron-left text-dark h1 fw-bold"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#fadeslide"
        data-bs-slide="next"
      >
        <span
          className="bi bi-chevron-right text-dark h1 fw-bold"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

const SlideItem = ({ className, src, label, desc }) => {
  return (
    <div className={"carousel-item " + className}>
      <img src={src} className="img-fluid w-100 " alt="#" />
      <div className="carousel-caption d-none d-lg-block text-dark">
        <p className="gi h2">{label}</p>
        <p className="gi h5 text-muted">{desc}</p>
      </div>
    </div>
  );
};

export default Dashboard;
