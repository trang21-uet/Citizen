import React, { useEffect } from "react";

const Modal = ({ id, label, children }) => {
  useEffect(() => {
    if (id === "delete-modal") {
      const btn = document.querySelector("#" + id + "-btn");
      console.log(btn);
      btn.removeAttribute("disabled");
      btn.classList.remove("btn-success");
      btn.classList.add("btn-danger");
      btn.innerHTML = "Xoá";
    }
  }, []);
  return (
    <div className="modal fade" id={id}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title fs-5">{label}</p>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Huỷ bỏ
            </button>
            <button
              type="submit"
              form={id + "-form"}
              className="btn btn-success"
              id={id + "-btn"}
            >
              Lưu lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
