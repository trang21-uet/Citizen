export default function handleInputChange() {
  const inputs = document.querySelectorAll("input");
  const loginBtn = document.querySelector("#login-btn");
  for (let input of inputs) {
    if (!input.value) {
      loginBtn.setAttribute("disabled", "");
      loginBtn.classList.remove("enabled");
      return;
    }
  }
  loginBtn.removeAttribute("disabled");
  loginBtn.classList.add("enabled");
}
