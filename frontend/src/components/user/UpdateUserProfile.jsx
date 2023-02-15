import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "./UpdateUserProfile.css";
import FaceIcon from "@material-ui/icons/Face";
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../Redux/user/user.action';
import * as types from "../../Redux/user/user.action.types"
import Loading from '../Loading skeleton/Loading';
import TopTitle from '../TopTitle';
import { useEffect } from 'react'

const UpdateUserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const alert = useAlert();
  
    const { user } = useSelector((state) => state.user);
    // console.log(user);
    const {error,loading,isUpdated} = useSelector((state) => state.profile);
    console.log("isUpdated",isUpdated);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  
    const updateProfileSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("avatar", avatar);
      dispatch(updateProfile(myForm));
    };
  
    const updateProfileDataChange = (e) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    };
  
    useEffect(() => {
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url);
      }
        if (error) {
              alert(error);
            //   dispatch(clearErrors());
            }
          
            if (isUpdated){
                alert("Profile Updated Successfully");
                // dispatch(loadUser());
              
            //   navigate("/account");
              
              dispatch({type: types.UPDATE_PROFILE_RESET});
    }
    }, [dispatch, error, navigate, user, isUpdated]);
  return (
    <>
    {loading ? (
      <Loading />
    ) : (
      <>
        <TopTitle title="Update Profile" />
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
      </>
    )}
  </>
  )
}

export default UpdateUserProfile