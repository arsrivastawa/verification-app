import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./compo/Form";
import Landing from "./compo/Landing";
import Verification from "./compo/Verification";
import ShowFormData from "./compo/ShowFormData";
import UpdateFormData from "./compo/UpdateFormData";
import DeleteFormData from "./compo/DeleteFormData";

function App() {
  return (
    <>
      <Router>
        <Landing />
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/" element={<ShowFormData />} />
          <Route path="/update-data" element={<UpdateFormData />} />
          <Route path="/delete-data" element={<DeleteFormData />} />
          <Route path="/otp-verification" element={<Verification />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
