import axios from "axios";
import "../App.css";
import React, { useEffect, useState } from "react";
import { BeatLoader, CircleLoader } from "react-spinners";
import { style } from "./Verification";
import { Link } from "react-router-dom";
const Form = () => {
  const [logInRegister, setLogInRegister] = useState(true);
  const [age, setAge] = useState(0);
  const [message, setMessage] = useState("");
  const [warnMessage, setwarnMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cnfPass, setCnfPass] = useState(false);
  // const [logInToRegisterLoader, setLogInToRegisterLoader] = useState(false);
  const [Pass, setPass] = useState(false);
  const [password, setPassword] = useState(false);
  const [loaderForRegister, setLoaderForRegister] = useState(false);
  const [messageStyle, setMessageStyle] = useState(style);
  /* function showMessage() {
      setMessage("Your Data Has Been Sent");
        setMessage("");
      }, 1000);
    } */
  function logInRegisterSwitcher() {
    setLogInRegister(!logInRegister);
  }
  function internalPasswordChecker() {
    setwarnMessage("");
    setTimeout(() => {
      if (
        document.querySelector("#pass").value !=
        document.querySelector("#cnfPass").value
      ) {
        setwarnMessage("Password Mismatch. Please enter correct password");
        // console.log("check");
      }
    }, 1000);
  }
  function handleSend() {
    if (age && email && name && password) {
      document.querySelector("#loaderForRegister").style.display = "block";
      setLoaderForRegister(true);
      axios
        .post(
          "http://localhost:3001/send",
          { age, email, name, password },
          { headers: { type: "create" } }
        )
        .then((inf) => {
          setMessage("Your Data Has Been Sent");
          setMessageStyle({ ...messageStyle, scale: "1" });
          setTimeout(() => {
            setMessage("");
          }, 5000);
        })
        .catch((e) => {
          setMessage(`Error Ho Gaya ${e}`);
        })
        .finally(() => {
          setName("");
          setEmail("");
          setPassword("");
          setAge("");
          setLoaderForRegister(false);
          document.querySelector("#loaderForRegister").style.display = "none";
          Array.from(document.querySelectorAll("input")).forEach((element) => {
            element.value = "";
          });
          console.log("first");
        });
    } else {
      setMessage("Please fill all the fields");
      let neww = messageStyle;
      setMessageStyle({ ...messageStyle, scale: "1", color: "red" });
      setTimeout(() => {
        setMessage("");
        setMessageStyle({ ...neww, scale: "1" });
      }, 5000);
    }
  }
  return (
    <>
      {/* <BeatLoader
        loading={logInToRegisterLoader}
        size={"30px"}
        color="blue"
        cssOverride={{
          width: "inherit",
          background: "transparent",
          position: "absolute",
          top: "50%",
          left: "50%",
          translate: "-50% -50%",
        }}
      /> */}
      <div className="App">
        {logInRegister ? (
          <div className="RegisterFormContainer">
            <h1>Register Yourself</h1>
            <h2 style={{ ...messageStyle }}>{message}</h2>
            <div className="formContainer">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
                type="text"
                name="name"
                id="name"
                placeholder="Enter the Name"
              />
              <input
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                name="email"
                id="email"
                placeholder="Enter the Email"
              />
              <input
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                type="number"
                required
                name="age"
                id="age"
                placeholder="Enter the Age"
              />
              <div className="passContainer">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  name="password"
                  required
                  id="pass"
                  placeholder="Enter the password"
                />
                <div
                  className="eye"
                  onClick={() => {
                    if (!Pass) {
                      document.querySelector("#pass").type = "text";
                      setPass(!Pass);
                    } else {
                      document.querySelector("#pass").type = "password";
                      setPass(!Pass);
                    }
                  }}
                >
                  {Pass ? (
                    <i class="bi bi-eye-slash"></i>
                  ) : (
                    <i class="bi bi-eye"></i>
                  )}
                </div>
              </div>
              <div className="passContainer">
                <input
                  onChange={(e) => {
                    internalPasswordChecker();
                  }}
                  required
                  type="password"
                  name="cnfPassword"
                  id="cnfPass"
                  placeholder="Confirm password"
                />
                <div
                  className="eye"
                  onClick={() => {
                    if (!cnfPass) {
                      document.querySelector("#cnfPass").type = "text";
                      setCnfPass(!cnfPass);
                    } else {
                      document.querySelector("#cnfPass").type = "password";
                      setCnfPass(!cnfPass);
                    }
                  }}
                >
                  {cnfPass ? (
                    <i class="bi bi-eye-slash"></i>
                  ) : (
                    <i class="bi bi-eye"></i>
                  )}
                </div>
              </div>
              <span className="warningMessage">
                {warnMessage}
                {/* Password Mismatch. Please enter correct password */}
              </span>
              <div
                id="loaderForRegister"
                style={{ backgroundColor: "white", display: "none" }}
              >
                <BeatLoader loading={loaderForRegister} />
              </div>
              {/* cssOverride={{ backgroundColor: "white", al: "center" }} */}
              <button
                onClick={(e) => {
                  handleSend();
                  e.preventDefault();
                }}
                type="submit"
                className="submitBtn"
              >
                Register
              </button>
              <div
                className="logInMessage"
                style={{
                  backgroundColor: "white",
                  padding: "2px",
                  margin: "2px",
                }}
              >
                Already a user?,
                <Link
                  onClick={() => {
                    logInRegisterSwitcher();
                  }}
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="logInFormContainer">
            <h1>Welcome Back!</h1>

            <h2 style={{ ...messageStyle }}>{message}</h2>
            <div className="formContainer">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                name="email"
                id="email"
                placeholder="Enter the Email"
              />

              <div className="passContainer">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  name="password"
                  id="pass"
                  placeholder="Enter the password"
                />
                <div
                  className="eye"
                  onClick={() => {
                    if (!Pass) {
                      document.querySelector("#pass").type = "text";
                      setPass(!Pass);
                    } else {
                      document.querySelector("#pass").type = "password";
                      setPass(!Pass);
                    }
                  }}
                >
                  {Pass ? (
                    <i class="bi bi-eye-slash"></i>
                  ) : (
                    <i class="bi bi-eye"></i>
                  )}
                </div>
              </div>

              <div
                id="loaderForRegister"
                style={{ backgroundColor: "white", display: "none" }}
              >
                <BeatLoader loading={loaderForRegister} />
              </div>
              {/* cssOverride={{ backgroundColor: "white", al: "center" }} */}
              <button
                onClick={(e) => {
                  handleSend();
                  e.preventDefault();
                }}
                type="submit"
                className="submitBtn"
              >
                Log In
              </button>
              <div
                className="logInMessage"
                style={{
                  backgroundColor: "white",
                  padding: "2px",
                  margin: "2px",
                }}
              >
                New user?,{" "}
                <Link
                  onClick={() => {
                    logInRegisterSwitcher();
                  }}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Form;
