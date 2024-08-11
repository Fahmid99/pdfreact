import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PdfViewer from "./pages/PdfViewer/PdfViewer";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade"; // Import Fade
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Inbox from "./pages/Inbox/Inbox";
import PolicyList from "./pages/PolicyList/PolicyList";
import intialData from "../data/dummy.json";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "./index.css";
import theme from "./theme"; // Import custom theme

function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSidebar, setShowSideBar] = useState(true);
  const data = intialData.policies;

  const handleSubmit = (id, oldData) => {
    const updatedData = {
      ...oldData,
      readStatus: true,
    };

    axios
      .put(`http://localhost:3001/policies/${id}`, updatedData)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleSideBar = () => {
    setShowSideBar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <div
          className="App"
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100vh",
            overflow: "hidden",
            justifyContent: "center",
          }}
        >
          <Sidebar
            data={data}
            showSidebar={showSidebar}
            handleSideBar={handleSideBar}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: showSidebar ? "calc(100% - 200px)" : "100%",
              height: "100vh",
              overflow: "hidden",
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard/>
                }
              />
              <Route
                path="/policies"
                element={<PdfViewer handleSubmit={handleSubmit} />}
              />
              <Route path="/inbox" element={<Inbox data={data} />} />
              <Route
                path="/policieslist"
                element={<PolicyList data={data} />}
              />
              <Route
                path="/pdfviewer/:id"
                element={<PdfViewer handleSubmit={handleSubmit} data={data} />}
              />
            </Routes>
          </div>
          <Fade in={showSuccess}>
            <Alert
              severity="success"
              style={{ position: "fixed", top: 10, right: 10 }}
            >
              Policy read has been confirmed.
            </Alert>
          </Fade>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
