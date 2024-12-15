import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const adminUrl = import.meta.env.VITE_ADMIN_URL;

  const [doctors, setDoctors] = useState([]);
  const [relDocs, setRelDocs] = useState([]);
  const [userData, setUserData] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [loading, setLoading] = useState(true);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) loadUserProfileData();
    setUserData(false);
  }, [token]);

  const value = {
    token,
    setToken,
    doctors,
    getDoctorsData,
    currencySymbol,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    relDocs,
    setRelDocs,
    loading,
    setLoading,
    adminUrl,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

export function useAppContext() {
  return useContext(AppContext);
}
