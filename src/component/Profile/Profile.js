import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const { loading1, user, isAuthenticated } = useSelector((state) => state.userData);
  useEffect(() => {
    if (isAuthenticated === false || isAuthenticated === "false") {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading1 ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={`http://localhost:4000/${user.avatar}`} alt={user.name} />
              <Link to="/updateProfile">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>

              <div>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
