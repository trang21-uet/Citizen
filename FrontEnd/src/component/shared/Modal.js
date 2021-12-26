import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ id, label, type, children, to, onClose }) => {
  const navigate = useNavigate();

  const clearInput = () => {
    Array.from(document.querySelectorAll("form input")).forEach((element) => {
      element.value = "";
    });
  };
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
              onClick={clearInput}
            ></button>
          </div>
          {children ? <div className="modal-body">{children}</div> : <></>}
          <div className="modal-footer">
            {type === "alert" && (
              <button
                type="button"
                className="btn btn-secondary mx-auto"
                data-bs-dismiss="modal"
                onClick={() => {
                  to ? navigate(to, { replace: true }) : clearInput();
                }}
              >
                Đóng
              </button>
            )}

            {type === "redirect" && (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={onClose}
                >
                  Tiếp tục
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    navigate(to);
                  }}
                >
                  Chuyển hướng
                </button>
              </>
            )}

            {type === "confirm" && (
              <>
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
                  data-bs-dismiss="modal"
                  className="btn btn-success"
                  id={id + "-btn"}
                >
                  Đồng ý
                </button>
              </>
            )}

            {!type && (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={clearInput}
                >
                  Huỷ bỏ
                </button>
                <button
                  disabled
                  type="submit"
                  form={id + "-form"}
                  data-bs-dismiss="modal"
                  className="btn btn-success"
                  id={id + "-btn"}
                >
                  Lưu lại
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
