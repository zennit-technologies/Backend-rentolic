import React, { useState, useEffect } from "react";
import "../../App.css";
import { firebase } from "../../firebase";
import Logo from "../../Assets/Images/Logo/logo.png";
import IconM from "../../Assets/Images/Logo/iconM.png";
import Routing from "../../Routing";

export const Login = (props) => {
  const MobAuth = props.number;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedWithEmailAndPassword, setIsLoggedWithEmailAndPassword] =
    useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail(email);
    setPassword(password);
    onClick(email, password);
  };
  //for email Validation
  const onClick = async (email, password) => {
    try{
      const userLogByEmail = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    if (userLogByEmail) {
      localStorage.setItem("loggedIn", true);
      setIsLoggedWithEmailAndPassword(true);
    } else {
      setIsLoggedWithEmailAndPassword(false);
      localStorage.setItem("loggedIn", false);
      alert("error signing in");
    }
    }catch{
      console.log(email, password);
      alert("User not Found !")
    }
    
    
  };
  useEffect(() => {
    if (localStorage.getItem("loggedIn")) setIsLoggedWithEmailAndPassword(true);
  }, []);

  return isLoggedWithEmailAndPassword ? (
    <Routing />
  ) : (
    <div className="login">
      <div className="container sm:px-10">
        <div className="block xl:grid grid-cols-2 gap-4">
          <div className="hidden xl:flex flex-col min-h-screen">
            <a href={"url"} className="-intro-x flex items-center pt-5">
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
                src={IconM}
              />
              <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                A few more clicks to
                <br />
                sign in to your account.
              </div>
            </div>
          </div>

          <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
            <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
              <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                Sign In
              </h2>
              <div className="intro-x mt-2 text-gray-500 xl:hidden text-center">
                A few more clicks to sign in to your account. Manage all your
                e-commerce accounts in one place
              </div>
              <div className="intro-x mt-8">
                <input
                  type="text"
                  className="intro-x login__input form-control py-3 px-4 border-gray-300 block"
                  value={MobAuth}
                  readOnly
                />
              </div>
              <div className="intro-x mt-8">
                <input
                  type="text"
                  className="intro-x login__input form-control py-3 px-4 border-gray-300 block"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />

                <input
                  type="password"
                  className="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4">
                <div className="flex items-center mr-auto">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="form-check-input border mr-2"
                  />
                  <label
                    className="cursor-pointer select-none"
                    htmlFor="remember-me"
                  >
                    Remember me
                  </label>
                </div>
                <button>Forgot Password?</button>
              </div>
              <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <button
                  className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
              <div className="intro-x mt-10 xl:mt-24 text-gray-700 dark:text-gray-600 text-center xl:text-left">
                By signin up, you agree to our
                <br />
                <a className="text-theme-1 dark:text-theme-10" href={"url"}>
                  Terms and Conditions
                </a>
                <a className="text-theme-1 dark:text-theme-10" href={"url"}>
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
