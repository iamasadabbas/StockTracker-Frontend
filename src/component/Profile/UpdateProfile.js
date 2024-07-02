import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updateProfile } from "../../actions/userDataAction";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../Redux/constants/userDataConstants";
import Profile from './Profile.png'
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userData);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  // console.log(avatar);
  const [avatarPreview, setAvatarPreview] = useState(Profile);

  const updateProfileSubmit = (e) => {
    e.preventDefault();
// console.log(name,email);
    const myForm = new FormData();
    myForm.append("_id",user._id)
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("avatar", avatar); 
    dispatch(updateProfile(myForm));
    // console.log(myForm);
  };

  const updateProfileDataChange = (e) => {
    const file = e.target.files[0]; // Get the first file selected
    const reader = new FileReader();
  
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(file); // Set the file object as avatar
      }
    };
  
    if (file) {
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar && user.avatar.url) {
        setAvatarPreview(user.avatar.url);
      } else {
        setAvatarPreview(Profile); // Set default avatar if user avatar is not available
      }
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/profile");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
