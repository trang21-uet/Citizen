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

export { checkInputs, toggleBtn };
