export function handleInputChange(type) {
  const inputs = document.querySelectorAll("input");
  const btn = document.querySelector("#" + type + "-btn");
  for (let input of inputs) {
    if (!input.value) {
      btn.setAttribute("disabled", "");
      btn.classList.remove("enabled");
      return;
    }
  }
  btn.removeAttribute("disabled");
  btn.classList.add("enabled");
}
