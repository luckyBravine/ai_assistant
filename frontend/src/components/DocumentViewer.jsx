import { useDispatch, useSelector } from "react-redux";
import { fetchLatestFile } from "../features/document";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { toast } from "sonner";
import { useState } from "react";
import { API_URL } from "../config/index";

const getFileType = (fileName) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  //declare the supported File types
  const supportedFileTypes = ["pdf", "txt", "docx", "doc"];
  return supportedFileTypes.includes(extension) ? extension : "default";
};

const DocumentViewer = () => {
  const dispatch = useDispatch();
  const { status, loading, errorMessage } = useSelector(
    (state) => state.document
  );
  const [documentUrl, setDocumentUrl] = useState(null);
  const [documentType, setDocumentType] = useState("default");

  const handleFetchLatestFile = () => {
    //Fetch the latest File
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
            toast.error(`Error fetching latest file: ${errorMessage}`);
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
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button
            onClick={handleFetchLatestFile}
            disabled={loading}
            className="btn btn-info float-left mt-2"
          >
            View Latest File
          </button>
        )}

        {status === "succeeded" && documentUrl && (
          <div>
            <DocViewer
              documents={[{ uri: documentUrl, fileType: documentType }]}
              pluginRenderers={DocViewerRenderers}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;
