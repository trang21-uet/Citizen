import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import Error from "../shared/Error";
import SignupForm from "./SignupForm";

const Signup = () => {
  const auth = useAuth();
  const [error, setError] = useState("");
  const [permission, setPermission] = useState(
    ["B1", "B2"].includes(auth.info().type)
  );
  const children = {
    A1: "A2",
    A2: "A3",
    A3: "B1",
    B1: "B2",
  };
  const child = children[auth.info().type] ? children[auth.info().type] : "";

  const request = async () => {
    await fetch("http://localhost:8000/api/trangthaiquyen", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth.info().access_token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.status;
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => setPermission(error !== 401));
  };

  useEffect(() => {
    document.title = "Citizen - Đăng ký";
    request();
    const accBtn = document.getElementById("account-tab");
    const accTab = document.getElementById("account");
    const prsBtn = document.getElementById("person-tab");
    const prsTab = document.getElementById("person");
    switch (auth.info().type) {
      case "A1":
      case "A2":
      case "A3":
        accBtn.removeAttribute("disabled");
        prsBtn.removeAttribute("aria-selected");
        prsBtn.classList.remove("active");
        prsTab.classList.remove("active", "show");
        break;
      case "B2":
        prsBtn.removeAttribute("disabled");
        accBtn.removeAttribute("aria-selected");
        accBtn.classList.remove("active");
        accTab.classList.remove("active", "show");
        break;
      default:
        accBtn.removeAttribute("disabled");
        prsBtn.removeAttribute("disabled");
        prsBtn.removeAttribute("aria-selected");
        prsBtn.classList.remove("active");
        prsTab.classList.remove("active", "show");
        break;
    }

    if (!permission) {
      if (auth.info().type === "B2") {
        setError("no permission");
      } else {
        prsBtn.removeAttribute("aria-selected");
        prsBtn.classList.remove("active");
        prsTab.classList.remove("active", "show");
      }
    }
  }, [permission]);

  return error ? (
    <Error status={error} />
  ) : (
    <div className="bg-secondary bg-opacity-25 px-lg-5 px-3 py-4">
      <SignupForm child={child} />
    </div>
  );
};

export default Signup;
