import Header from "./Header";
import SignupForm from "./SignupForm";

const Dashboard = (props) => {
  return (
    <div className="container-fluid d-block justify-content-around align-items-center vh-100 px-lg-5 px-md-5 px-sm-3">
      <Header></Header>
      <SignupForm></SignupForm>
    </div>
  );
};

export default Dashboard;
