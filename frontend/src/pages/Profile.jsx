import React, { useState } from "react";
import proStyles from "./Css/Profile.module.css";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useAppContext();

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.put(
        backendUrl + "/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleEdit = () => {
    if (isEdit) setIsEdit(false);
    else setIsEdit(true);
  };

  return (
    userData && (
      <section className={proStyles.my_profile}>
        <div className={proStyles.section1}>
          {isEdit ? (
            <label htmlFor="img-upload">
              <figure className={proStyles.img_holder}>
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  loading="lazy"
                />
                <img src={image ? "" : assets.upload_icon} loading="lazy" />
              </figure>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
                id="img-upload"
              />
            </label>
          ) : (
            <figure className={proStyles.img_holder}>
              <img src={userData.image} loading="lazy" />
            </figure>
          )}
          {isEdit ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p>{userData.name}</p>
          )}
          <hr />
        </div>
        {/* section2 */}
        <div className={proStyles.section2}>
          <h4>Contact Information</h4>
          <div className={proStyles.contact_info_holder}>
            <div className={proStyles.email}>
              <span>E-mail id:</span>
              {isEdit ? (
                <input
                  type="email"
                  name="email"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  value={userData.email}
                />
              ) : (
                <p>{userData.email}</p>
              )}
            </div>
            <div className={proStyles.phone}>
              <span>Phone No:</span>
              {isEdit ? (
                <input
                  type="phone"
                  name="phone"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  value={userData.phone}
                />
              ) : (
                <p>{userData.phone}</p>
              )}
            </div>
            <div className={proStyles.address}>
              <span>Address:</span>
              {isEdit ? (
                <div className={proStyles.address_input_holder}>
                  <input
                    type="text"
                    name="line1"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={userData.address.line1}
                  />
                  <input
                    type="text"
                    name="line2"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={userData.address.line2}
                  />
                </div>
              ) : (
                <p>
                  {userData.address.line1} <br /> {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* section 3 */}
        <div className={proStyles.section3}>
          <h4>BAsic Information</h4>
          <div className={proStyles.basic_info_holder}>
            <div className={proStyles.gender}>
              <span>Gender:</span>
              {isEdit ? (
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              ) : (
                <p>{userData.gender}</p>
              )}
            </div>
            <div className={proStyles.birth_date}>
              <span>Birth Date:</span>
              {isEdit ? (
                <input
                  type="date"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, DOB: e.target.value }))
                  }
                  value={userData.DOB}
                />
              ) : (
                <p>{userData.dob}</p>
              )}
            </div>
          </div>
        </div>
        <div className={proStyles.btn_holder}>
          {isEdit ? (
            <button
              className={proStyles.green_btn}
              onClick={updateUserProfileData}
            >
              Save Info
            </button>
          ) : (
            <button onClick={handleEdit}>Edit Info</button>
          )}
        </div>
      </section>
    )
  );
};

export default Profile;
