import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  const [search, setSearch] = useState("");
  function handleSaerch() {
    if (search) {
      console.log("\nNow search will be performed\n");
      axios
        .post("http://localhost:3001/search", { search })
        .then((res) => {
          console.log(res.data.value);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
    setSearch("");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/form">
                Login / Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/otp-verification">
                Verify OTP
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Form Operations
              </a>
              <ul
                className="dropdown-menu b-900"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/">
                    Show Form Data
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/delete-data">
                    <i className="bi bi-trash3"></i> Delete Data
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="/"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
          <form className="d-flex">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
                console.log(typeof e.target.value);
              }}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={(e) => {
                handleSaerch();
                e.preventDefault();
              }}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
export default Landing;
