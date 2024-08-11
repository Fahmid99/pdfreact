import { useState } from "react";
import { useParams } from "react-router-dom";
import Pdf from "./components/Pdf";
import IntroDivider from "./components/PdfInfoCard";
import { pdfjs } from "react-pdf";
import base64Content from "./base64Content.txt?raw";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Card from "@mui/material/Card"; // Import Card component
import ConfirmTab from "./components/ConfirmTab";
import PdfControls from "../../components/PdfControls";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfViewer = ({ handleSubmit, data }) => {
  const { id } = useParams();
  const policy = data.find((p) => p.id === parseInt(id));

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const base64String = `data:application/pdf;base64,${base64Content}`;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleZoomIn = () => {
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    setScale(scale - 0.1);
  };

  const handlePageNumber = (action) => {
    if (action === "back") {
      setPageNumber(pageNumber - 1);
    } else {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleSubmitDisabled = () => {
    setSubmitDisabled(!submitDisabled);
    console.log(submitDisabled);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100% - 80px)",
        justifyContent: "center",
        background: "#525659",
        position: "relative",
      }}
    >
      <IntroDivider policy={policy} />
      <PdfControls
        pageNumber={pageNumber}
        handlePageNumber={handlePageNumber}
        numPages={numPages}
        submitDisabled={submitDisabled}
        handleSubmit={handleSubmit}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          overflow: "auto",
        }}
      >
        <div
          style={{
            flex: 1,
            overflow: "visible",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            elevation={3}
            style={{
              width: "fit-content",
              padding: "16px",
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              overflow: "hidden",
              marginTop: "10px",
              marginBottom: "100px",
            }}
          >
            {" "}
            {/* Use Card component for elevation */}
            <Pdf
              base64String={base64String}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
              pageNumber={pageNumber}
              scale={scale}
            />
          </Card>
        </div>
      </div>
      {policy.readStatus === false ? (
        <ConfirmTab
          handleSubmitDisabled={handleSubmitDisabled}
          submitDisabled={submitDisabled}
          handleSubmit={handleSubmit}
          policy={policy}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PdfViewer;
