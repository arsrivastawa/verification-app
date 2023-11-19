import axios from "axios";
import React, { useEffect, useState } from "react";
import { BeatLoader, CircleLoader, SyncLoader } from "react-spinners";
import UpdateFormData from "./UpdateFormData";

const ShowFormData = () => {
  const [loadMessage, setLoadMessage] = useState("");
  const [data, setData] = useState([]);
  const [dataLoader, setDataLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  // const []
  function loadData() {
    setDataLoader(true);
    setLoadMessage("Your Data Has'nt Been Loaded Yet, We are Loading It");
    axios
      .post("http://localhost:3001/load-data")
      .then((res) => {
        setData(res.data.formData);
      })
      .catch((err) => {})
      .finally(() => {
        setDataLoader(false);
      });
  }
  useEffect(() => loadData(), []);
  function handleDelete(id) {
    // setDeleteLoader(true)
    console.log(id);
    // setDeleteLoader(true);
    axios
      .post("http://localhost:3001/delete", { id })
      .then((res) => {
        console.log("Ho Gaya");
        console.log("\n", res.data.count);
        setData([...res.data.val]);
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <button className="submitBtn" onClick={loadData}>
        Refresh
      </button>
      <div className="tableContainer">
        <CircleLoader color="blue" loading={dataLoader} />
        <table className="App">
          <tbody>
            <tr>
              <th className="odd" colSpan={5}>
                Here is the data entred through form!
              </th>
            </tr>
          </tbody>
          <tbody>
            <tr className="even">
              <td>Id</td>
              <td>Name</td>
              <td>Age</td>
              <td>Email</td>
              <td>Actions</td>
            </tr>
            {data.map((data, index) => {
              if (index % 2 == 0) {
                return (
                  <tr className="odd" key={data._id}>
                    <td>{data._id}</td>
                    <td>{data.name}</td>
                    <td>{data.age}</td>
                    <td>{data.email}</td>
                    <td>
                      <i
                        class="bi bi-trash"
                        onClick={() => handleDelete(data._id)}
                      ></i>
                      <i
                        class="bi bi-pencil-square"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(data._id);
                        }}
                        style={{ marginLeft: "15px" }}
                      ></i>
                      <CircleLoader
                        size={"20px"}
                        color="blue"
                        loading={deleteLoader}
                        cssOverride={{
                          display: "initial",
                          marginLeft: "15px",
                          verticalAlign: "middle",
                        }}
                      />
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr className="even" key={data._id}>
                    <td>{data._id}</td>
                    <td>{data.name}</td>
                    <td>{data.age}</td>
                    <td>{data.email}</td>
                    <td>
                      <i
                        class="bi bi-trash"
                        onClick={() => handleDelete(data._id)}
                      ></i>
                      <i
                        onClick={(e) => {
                          e.preventDefault();
                          alert(data._id);
                        }}
                        class="bi bi-pencil-square"
                        style={{ marginLeft: "15px" }}
                      ></i>
                      <CircleLoader
                        size={"20px"}
                        color="lightblue"
                        loading={deleteLoader}
                        cssOverride={{
                          display: "initial",
                          marginLeft: "15px",
                          verticalAlign: "middle",
                        }}
                      />
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <UpdateFormData />
      </div>
    </>
  );
};

export default ShowFormData;
