import axios from "axios";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
const style = {
  transition: "0.2s",
  scale: "0",
};
const Verification = () => {
  const [emailLoader, setEmailLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [otpLoader, setOTPLoader] = useState(false);
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState(style);

  // function handleSendOTP() {
  //   axios
  //     .post("http://localhost:3001/send-otp", { email })
  //     .then((res) => {
  //       setMessageStyle({
  //         ...messageStyle,
  //         scale: "1",
  //       });
  //       if (res.data.value) {
  //         setMessage("OTP has Been Sent");
  //       } else {
  //         setMessage("Error Sending the OTP");
  //       }
  //     })
  //     .catch((err) => {
  //       setMessage(`Got an Error ${err}`);
  //     })
  //     .finally(() => {
  //       setEmailLoader(false);
  //       setTimeout(() => {
  //         setTimeout(() => setMessage(""), 200);
  //         setMessageStyle({
  //           ...messageStyle,
  //           scale: "0",
  //         });
  //       }, 5000);
  //     });
  // }
  function handleSendOTP() {
    axios
      .post("http://localhost:3001/send-otp", { email })
      .then((res) => {
        // console.log("RES", res.data.val);
        setMessageStyle({
          ...messageStyle,
          scale: "1",
        });
        if (res.data.val) {
          setMessage("We have sent the OTP");
        } else {
          setMessage("Error while sending the OTP");
        }
      })
      .catch((err) => {
        setMessage(`Got this Error ${err}`);
      })
      .finally(() => {
        // console.log("Finally has Run");
        setEmailLoader(false);
        setTimeout(() => {
          setTimeout(() => setMessage(""), 200);
          setMessageStyle({
            ...messageStyle,
            scale: "0",
          });
        }, 5000);
      });
  }
  function handleVerifyOTP() {
    axios
      .post("http://localhost:3001/verify-otp", { otp })
      .then((res) => {
        setMessageStyle({
          ...messageStyle,
          scale: "1",
        });
        if (res.data.value) {
          setMessage("OTP Verified Successfully");
        } else {
          setMessage("You entered the wrong OTP");
        }
      })
      .catch((err) => {
        setMessage(`Got an Error ${err}`);
      })
      .finally(() => {
        setOTPLoader(false);
        setTimeout(() => {
          setTimeout(() => setMessage(""), 200);
          setMessageStyle({
            ...messageStyle,
            scale: "0",
          });
        }, 5000);
      });
  }

  return (
    <div className="App">
      <h1>Verify Your OTP</h1>

      <h3 style={{ ...messageStyle }}>{message}</h3>
      <div className="formContainer">
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          name="email"
          id="email"
          placeholder="Enter your Email"
        />
        <button
          onClick={(e) => {
            handleSendOTP();
            setEmailLoader(true);
            e.preventDefault();
          }}
          type="submit"
          className="submitBtn"
        >
          Submit
        </button>
        <BeatLoader
          id="BeatLoaderForEmail"
          loading={emailLoader}
          color="blue"
          size={"20px"}
          cssOverride={{ margin: "20px" }}
        />
        <input
          onChange={(e) => {
            setOTP(e.target.value);
          }}
          type="text"
          name="otp"
          id="otp"
          placeholder="Enter OTP we just sent to you"
        />
        <button
          onClick={(e) => {
            handleVerifyOTP();
            setOTPLoader(true);
            e.preventDefault();
          }}
          type="submit"
          className="submitBtn"
        >
          Submit
        </button>
      </div>

      <BeatLoader
        loading={otpLoader}
        color="blue"
        size={"20px"}
        cssOverride={{ margin: "20px" }}
      />
    </div>
  );
};

export default Verification;
export { style };
