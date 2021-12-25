import { Modal } from "bootstrap/dist/js/bootstrap.bundle";

const checkInputs = (id) => {
  const inputs = document.querySelectorAll("#" + id + " input");
  for (let input of inputs) {
    if (!input.value) {
      return false;
    }
  }
  return true;
};

const toggleBtn = (id, force) => {
  const btn = document.getElementById(id);
  btn.toggleAttribute("disabled", !force);
  btn.classList.toggle("enabled", force);
};

const toggleModal = (id, state) => {
  const modal = new Modal(document.getElementById(id));
  state === true ? modal.show() : modal.hide();
};

export { checkInputs, toggleBtn, toggleModal };
