import Header from "./Header";
import { currentAuth } from "../logic/handler";
import { Navigate } from "react-router-dom";

const Dashboard = (props) => {
  return currentAuth.loggedIn() ? (
    <Header></Header>
  ) : (
    <Navigate to="/login"></Navigate>
  );
};

export default Dashboard;
