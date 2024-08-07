import React, { Fragment, useEffect, useState } from "react";
import "./ForgotPassword.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "../../actions/userDataAction";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
