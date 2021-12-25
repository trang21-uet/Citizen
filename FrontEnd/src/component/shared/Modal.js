import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ id, label, type, children, to }) => {
  const navigate = useNavigate();
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
              onClick={() => {
                document.querySelectorAll("form input").forEach((element) => {
                  element.value = "";
                });
              }}
            ></button>
          </div>
          {children ? <div className="modal-body">{children}</div> : <></>}
          <div className="modal-footer">
            {type === "alert" && (
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  to
                    ? navigate(to, { replace: true })
                    : document
                        .querySelectorAll("form input")
                        .forEach((element) => {
                          element.value = "";
                        });
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
                  onClick={() => {
                    document
                      .querySelectorAll("form input")
                      .forEach((element) => {
                        element.value = "";
                      });
                  }}
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

            {!type && (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    document
                      .querySelectorAll("form input")
                      .forEach((element) => {
                        element.value = "";
                      });
                  }}
                >
                  Huỷ bỏ
                </button>
                <button
                  disabled
                  type="submit"
                  form={id + "-form"}
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
