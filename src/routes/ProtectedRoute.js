import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader/Loader";

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const navigate = useNavigate();
  const { loading1, isAuthenticated, user } = useSelector((state) => state.userData);

  // useEffect(() => {
  //   if (!loading1 && (isAuthenticated === undefined || isAuthenticated === false)) {
  //     navigate("/login");
  //   }
  // }, [loading1, isAuthenticated, navigate]);

  if (loading1 || isAuthenticated === undefined) {
    return <Loader />;
  }

  if (!loading1 && isAuthenticated) {
    if (user?.role_id?.name === role || user?.role_id?.name === "SuperAdmin" || user?.role_id?.name === "Admin") {
      return <Component {...rest} />;
    } else {
      // You can navigate to a "Not Authorized" page or show a message here
      return <div>Not Authorized</div>;
    }
  }

  return null;
};

export default ProtectedRoute;
