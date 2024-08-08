
import { Document, Page} from "react-pdf";
function Pdf({base64String, onDocumentLoadSuccess, pageNumber, scale}) {
 
  
  return (
    <div>
      <Document file={base64String} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} scale={scale} /> 
      </Document>
    </div>
  );
}

export default Pdf;
