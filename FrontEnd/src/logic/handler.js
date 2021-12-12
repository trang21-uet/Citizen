import auth from "./auth";

export const currentAuth = auth;

export function handleInputChange() {
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

export function handleFormSubmit(navigate) {
  auth.login(() => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:8000/api/login");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(
      JSON.stringify({
        tenTK: username,
        MK: password,
      })
    );

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = xhr.responseText;
        let obj = JSON.parse(response);
        window.localStorage.setItem("token", obj.access_token);
      }
    };
    navigate("/");
  });
}
