import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const ProtectedRoute = ({ component: Component ,role, ...rest}) => {
  const navigate = useNavigate();
  const { loading1, isAuthenticated,user } = useSelector((state) => state.userData);
  // console.log(user);

  useEffect(() => {
    if (!loading1 && (isAuthenticated === undefined || isAuthenticated === false)) {
      navigate("/login");
    }
  }, [loading1, isAuthenticated, navigate]);

  if (loading1 || isAuthenticated === undefined) {
    // Show a loading spinner or placeholder until the auth state is determined
    return <Loader/>
  }

  return (
    !loading1 && isAuthenticated  ? <Component {...rest} /> : null
  );
};

export default ProtectedRoute;
