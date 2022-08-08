import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Otp from "./components/Login/Otp";
import Login from "./components/Login/Login";
const App = () => {
  const [User] = useAuthState(auth);
  const [phoneNumberUpdate, setPhoneNumberUpdate] = useState("");
  const [isLoggedOtp, setIsLoggedOtp] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("loggedInOtp")) setIsLoggedOtp(true);
    setTimeout(() => {
      try {
        if (User) { 
          setPhoneNumberUpdate(User.phoneNumber);
          localStorage.setItem("loggedInOtp", true);
          localStorage.setItem("tokenOtp", User.accessToken);
          setIsLoggedOtp(true);
        }
      } catch (error) {
        setIsLoggedOtp(false);
        localStorage.setItem("loggedInOtp", false);
        console.log("error signing in", error);
      }
    }, 1000);
  }, [User]);
  return isLoggedOtp ? <Login number={phoneNumberUpdate} /> : <Otp/>;
};

export default App;


