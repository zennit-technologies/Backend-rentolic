import React, { useState, useEffect} from "react";
import "../../App.css";
import Logo from "../../Assets/Images/Logo/logo.png";
import OtpIcon from "../../Assets/Images/Logo/otp.png";
import { firebase, auth } from "../../firebase";
import "react-phone-input-2/lib/style.css";

export const Otp = () => {
  const url = "www.google.com";
  // Inputs
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [final, setFinal] = useState("");

  const [countryCode, setCountryCode] = useState("");

  const getCountryCallingCode = async () => {
    const response = await fetch('https://ipapi.co/json/');
    console.log(response);
    const data = await response.json();
    console.log(data);
    console.log(data.country_calling_code);
    setCountryCode(data.country_calling_code);
    console.log(countryCode);
}
    
useEffect(() => {
    // fetch('https://ipapi.co/json/')
    
    // .then ((apidata) =>{
    //   console.log(apidata);
    //   return apidata.json;
    // }) 
    // .then ((jsondata) =>{
    //   console.log(jsondata);
    // })
    // .catch((error) =>{
    //   console.log(error);
    // })
    getCountryCallingCode();
  }, []);
  // Sent OTP
  const signInWithNumber = () => {
    if (number === "" || number.length < 10) return;

    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(countryCode + number, verify)
      .then((result) => {
        setFinal(result);
        alert("code sent");
        setShow(true);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };
  return (
    <div className="login">
      <div className="container sm:px-10">
        <div className="block xl:grid grid-cols-2 gap-4">
          <div className="hidden xl:flex flex-col min-h-screen">
            <a href={url} className="-intro-x flex items-center pt-5">
              {/* <img
                alt="Rubick Tailwind HTML Admin Template"
                className="w-6"
                src={Logo}
              /> */}
              <span className="text-white text-lg ml-3">
                RENTOLIC
              </span>
            </a>
            <div className="my-auto">
              <img
                alt="Rubick Tailwind HTML Admin Template"
                className="-intro-x w-1/2 -mt-16"
                src={OtpIcon}
              />
              {/* <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                A few more clicks to
                <br />
                sign in to your account.
              </div> */}
            </div>
          </div>

          <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
            <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
              <h2 className="intro-x font-bold text-2xl xl:text-3xl" style={{color:"black"}}>
                Admin Login
              </h2>
              <p className="intro-x mt-3">Please Verify your Phone Number</p>
              <div className="intro-x mt-2 text-gray-500 xl:hidden text-center">
                A few more clicks to sign in to your account.
              </div>
              <div className="intro-x mt-8">
                <div style={{ display: !show ? "block" : "none" }}>
                  <input
                    className="intro-x login__input form-control py-3 px-4 border-gray-300 block"
                    value={number}
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                    placeholder="Enter your Phone Number"
                  />

                  <div
                    id="recaptcha-container"
                    className="intro-x mt-3 w-full xl:w-32 xl:mr-3 align-top"
                  ></div>
                  <button
                    className="btn btn-primary py-3 px-4 mt-3 w-full xl:w-32 xl:mr-3 align-top"
                    onClick={signInWithNumber}
                  >
                    Send OTP
                  </button>
                </div>
                <div
                  className="intro-x mt-8"
                  style={{ display: show ? "block" : "none" }}
                >
                  <input
                    type="text"
                    className="intro-x login__input form-control py-3 px-4 border-gray-300 block"
                    placeholder={"Enter your OTP"}
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                  ></input>

                  <button
                    className="btn btn-primary py-3 px-4 mt-3 w-full xl:w-32 xl:mr-3 align-top"
                    onClick={ValidateOtp}
                  >
                    Verify
                  </button>
                  <div className="intro-x mt-10 xl:mt-24 text-gray-700 dark:text-gray-600 text-center xl:text-left">
                    I didn't get the Code
                    <br />
                    <button
                      className="text-theme-1 dark:text-theme-10"
                      onClick={ValidateOtp}
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
