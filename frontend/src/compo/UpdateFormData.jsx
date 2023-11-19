import axios from "axios";
import React, { useState } from "react";

const UpdateFormData = () => {
  const [warningMsg, setwarningMsg] = useState("");
  const [verified, setVerified] = useState(false);
  const [objId, setObjId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  function validateId(ID) {
    axios.post("http://localhost:3001/search", { search: ID }).then((inf) => {
      // console.log(inf.data);
      if (inf.data.value) {
        setVerified(true);
        setwarningMsg("");
      } else {
        setwarningMsg("Invalid Id");
        setVerified(false);
        setDisabled();
      }
    });
  }
  function handleUpdate(id, name, email, age) {
    axios
      .post(
        "http://localhost:3001/send",
        { id, name, email, age },
        { headers: { type: "update" } }
      )
      .then((res) => {
        alert(res.data.value);
      })
      .catch((err) => {
        alert("Got an error");
      });
  }
  function setEnabled() {
    document.querySelector("#upName").disabled = false;
    document.querySelector("#upEmail").disabled = false;
    document.querySelector("#upAge").disabled = false;
  }
  function setDisabled() {
    document.querySelector("#upName").disabled = true;
    document.querySelector("#upEmail").disabled = true;
    document.querySelector("#upAge").disabled = true;
  }
  function checkEmptyID(e) {
    if (e.target.value != "") {
      setEnabled();
    } else {
      setDisabled();
    }
  }
  return (
    <>
      <div className="updateFormContainer">
        <div className="submitAndForm">
          <div className="updateForm">
            <div className="inputContainer nameInputContainer">
              <label htmlFor="objectId">Enter Object Id to update:</label>
              <input
                onChange={(e) => {
                  checkEmptyID(e);
                  setObjId(e.target.value);
                  console.log(typeof objId);
                }}
                className="inputField"
                type="text"
                name="objectId"
                id="objId"
                placeholder="Enter the User ID"
              />
              {warningMsg}
            </div>
            <div className="inputContainer nameInputContainer">
              <label htmlFor="name">Enter name:</label>
              <input
                // onFocusCapture={(e) => {
                //   if (e.target.disabled === true) {
                //     console.log("disabled");
                //   } else {
                //     console.log("Not");
                //   }
                // }}
                // onBeforeInput={(e) => {
                //   alert("Hey There");
                //   e.preventDefault();
                // }}
                onChange={(e) => {
                  setName(e.target.value);
                  validateId(objId);
                }}
                // onBlur={() => {
                // }}
                disabled={true}
                className="inputField"
                type="text"
                name="name"
                id="upName"
                placeholder="Enter new name"
              />
            </div>
            <div className="inputContainer nameInputContainer">
              <label htmlFor="email">Enter email:</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled={true}
                className="inputField"
                type="text"
                name="email"
                id="upEmail"
                placeholder="Enter new email"
              />
            </div>
            <div className="inputContainer nameInputContainer">
              <label htmlFor="age">Enter age:</label>
              <input
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                disabled={true}
                className="inputField"
                type="number"
                name="age"
                id="upAge"
                placeholder="Enter new age"
              />
            </div>
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              handleUpdate(objId, name, email, age);
            }}
            className="submitBtn"
            style={{ padding: "6px 15px", width: "unset" }}
          >
            Submit
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateFormData;
