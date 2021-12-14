const checkInputs = () => {
  const inputs = document.querySelectorAll("input");
  for (let input of inputs) {
    if (!input.value) {
      return false;
    }
  }
  return true;
};

const toggleBtn = (type, force) => {
  const btn = document.querySelector("#" + type + "-btn");
  btn.toggleAttribute("disabled", !force);
  btn.classList.toggle("enabled", force);
};

export { checkInputs, toggleBtn };
