import React, { useState, useEffect } from "react";
import axios from "axios";
import docProStyle from "../Css/DoctorProfile.module.css";
import { useDoctorContext } from "../../context/DoctorContext";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useDoctorContext();
  const { currency } = useAppContext();

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.put(
        backendUrl + "/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  return (
    profileData && (
      <section className={docProStyle.doctors_profile}>
        <article className={docProStyle.doc_info_wrapper}>
          <figure className={docProStyle.doc_img_wrapper}>
            <img src={profileData.image} loading="lazy" />
          </figure>

          <div className={docProStyle.doc_info}>
            <h2>{profileData.name}</h2>
            <span>
              {profileData.degree} - {profileData.specialty}
            </span>{" "}
            <span>{profileData.experience}</span>
          </div>

          <div className={docProStyle.doc_desc}>
            <span>About:</span>
            <p>{profileData.about}</p>
          </div>

          <div className={docProStyle.doc_fees}>
            <span>Appointment fee:</span>
            {isEdit ? (
              <input
                type="number"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    fees: e.target.value,
                  }))
                }
                value={profileData.fees}
              />
            ) : (
              <p>
                {currency} {profileData.fees}
              </p>
            )}
          </div>

          <div className={docProStyle.doc_address}>
            <span>Address:</span>
            {isEdit ? (
              <input
                type="text"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={profileData.address.line1}
              />
            ) : (
              <p>{profileData.address.line1}</p>
            )}
            <br />
            {isEdit ? (
              <input
                type="text"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={profileData.address.line2}
              />
            ) : (
              <p>{profileData.address.line2}</p>
            )}
          </div>

          <div className={docProStyle.doc_status}>
            <input
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              checked={profileData.available}
              type="checkbox"
              id="ava"
            />
            <label htmlFor="ava">Available</label>
          </div>

          {isEdit ? (
            <button onClick={updateProfile} className={docProStyle.btn_green}>
              Save
            </button>
          ) : (
            <button onClick={() => setIsEdit(true)}>Edit</button>
          )}
        </article>
      </section>
    )
  );
};

export default DoctorProfile;
