import { useDispatch, useSelector } from "react-redux";
import { fetchLatestFile } from "../features/document";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { toast } from "sonner";
import { useState } from "react";
import { API_URL } from "../config/index";

const getFileType = (fileName) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  const supportedFileTypes = ["pdf", "txt", "docx", "doc"];
  return supportedFileTypes.includes(extension) ? extension : "default";
};

const DocumentViewer = () => {
  const dispatch = useDispatch();
  const { currentFile, status, loading, errorMessage, } = useSelector(
    (state) => state.document
  );
  const [documentUrl, setDocumentUrl] = useState(null);
  const [documentType, setDocumentType] = useState("default");
  // {updatedDoc} suggestions

  const handleFetchLatestFile = () => {
    dispatch(fetchLatestFile())
      .unwrap()
      .then((filePath) => {
        if (typeof filePath !== "string") {
          throw new Error("Document URL is not a string");
        }

        const fullUrl = `${API_URL}${filePath}`;
        console.log("Full URL:", fullUrl);

        const fileType = getFileType(filePath);
        console.log("Detected File Type:", fileType);
        setDocumentType(fileType);

        fetch(fullUrl, { method: "HEAD" })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch the document");
            }
            setDocumentUrl(fullUrl);
            toast.success("Latest file fetched successfully");
          })
          .catch((error) => {
            console.error("Error fetching document:", error);
            toast.error(`Error fetching latest file: ${error.message}`);
          });
      })
      .catch((error) => {
        console.error("Error fetching latest file:", error);
        toast.error(`Error fetching latest file: ${error.message}`);
      });
  };

  return (
    <div>
      <div>
        <button onClick={handleFetchLatestFile} disabled={loading}>
          {loading ? "Loading..." : "Fetch Latest File"}
        </button>
        {status === "succeeded" && documentUrl && (
          <div>
            <h2>Latest Uploaded File</h2>
            <p>ID: {currentFile?.id}</p>
            <DocViewer
              documents={[{ uri: documentUrl, fileType: documentType }]}
              pluginRenderers={DocViewerRenderers}
            />
            
            {/* <iframe
              className="file-viewer"
              width="100%"
              height="600"
              frameBorder="0"
              src={`https://docs.google.com/gview?url=${documentUrl}&embedded=true`}
            ></iframe> */}
          </div>
        )}
        {/* {status === "succeeded" && suggestions && (
          <DocViewer
          documents={[{ uri: updatedDoc, fileType: documentType }]}
          pluginRenderers={DocViewerRenderers}
        />
        )} */}
        {status === "failed" && <p>Error: {errorMessage}</p>}
      </div>
    </div>
  );
};

export default DocumentViewer;
