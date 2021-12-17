import React, { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";

const Profile = () => {
  const auth = useAuth();
  useEffect(() => {
    document.title = "Citizen - Profile";
  });
  return <>Profile {auth.info().type}</>;
};

export default Profile;
