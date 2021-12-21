import React from "react";

const Form = (props) => {
  return <div className="container w-100 vh-100">
    <div className="mb-3">
      <a href="https://drive.google.com/file/d/1Zi1AyGhe1L3Ty2_DCDcacqXlXaU0M_ES/view" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true">Tải Xuống</a>
    </div>
    <iframe src="https://drive.google.com/file/d/1Zi1AyGhe1L3Ty2_DCDcacqXlXaU0M_ES/preview" width="100%" height="100%" allow="autoplay"></iframe>
  </div>;
};
export default Form;