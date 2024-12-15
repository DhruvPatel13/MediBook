import React, { useState } from "react";
import addStyles from "../Css/AddDoctor.module.css";
import axios from "axios";
import { useAdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const AddDoctor = () => {
  const { backendUrl, aToken } = useAdminContext();

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) return toast.error("Image Not Selected");

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("specialty", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        backendUrl + "/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setFees("");
        setAbout("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setExperience("1 Year");
        setSpeciality("General physician");
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(data.message);
      console.log(e);
    }
  };
  return (
    <section className={addStyles.add_doctor}>
      <h1>Add Doctor</h1>
      <form onSubmit={onSubmitHandler}>
        <figure className={addStyles.image_upload}>
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              loading="lazy"
            />
          </label>
          <input
            type="file"
            onChange={(e) => setDocImg(e.target.files[0])}
            id="doc-img"
            hidden
            required
          />
          <figcaption>
            Upload doctor <br />
            picture
          </figcaption>
        </figure>
        <div className={addStyles.inputs_holder}>
          <div className={addStyles.holder_left}>
            <div className={addStyles.name}>
              <label>Doctor's Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name here"
                required
              />
            </div>  
            <div className={addStyles.email}>
              <label>Doctor's Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email here"
                required
              />
            </div>
            <div className={addStyles.password}>
              <label>Doctor's Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password here"
                required
              />
            </div>
            <div className={addStyles.experience}>
              <label>Doctor's Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
                <option value="10 Years +">10 Years +</option>
              </select>
            </div>
            <div className={addStyles.fees}>
              <label>Doctor's Fees</label>
              <input
                type="text"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                placeholder="Fees here"
                required
              />
            </div>
          </div>
          <div className={addStyles.holder_right}>
            <div className={addStyles.specialty}>
              <label>Doctor's Speciality</label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className={addStyles.degree}>
              <label>Doctor's Degree</label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="Degree here"
                required
              />
            </div>
            <div className={addStyles.address}>
              <label>Doctor's Address</label>
              <input
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                placeholder="Address1 here"
                required
              />
              <input
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                placeholder="Address2 here"
                required
              />
            </div>
          </div>
        </div>
        <div className={addStyles.text_area}>
          <label >Doctor's Description</label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="Write about doctor"
            rows={4}
            required
          />
        </div>
        <button type="submit">Add Doctor</button>
      </form>
    </section>
  );
};

export default AddDoctor;
