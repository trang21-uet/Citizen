import { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import SignupForm from "./SignupForm";

const Signup = () => {
  const auth = useAuth();
  const children = {
    A1: "A2",
    A2: "A3",
    A3: "B1",
    B1: "B2",
  };
  const child = children[auth.info().type] ? children[auth.info().type] : "";

  useEffect(() => {
    document.title = "Citizen - Đăng ký";
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
  }, []);

  return (
    <div className="bg-secondary bg-opacity-25 px-lg-5 px-3 py-4">
      <SignupForm child={child} />
    </div>
  );
};

export default Signup;
