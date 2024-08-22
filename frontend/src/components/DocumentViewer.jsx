import { useDispatch, useSelector } from "react-redux";
import { fetchLatestFile } from "../features/document";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { API_URL } from "../config/index";

// Helper function to determine file type
const getFileType = (fileName) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  const supportedFileTypes = ["pdf", "txt", "docx", "doc", "xlsx",];
  return supportedFileTypes.includes(extension) ? extension : null;
};

const DocumentViewer = () => {
  const dispatch = useDispatch();
  const { status, loading, errorMessage } = useSelector((state) => state.document);
  const [documentUrl, setDocumentUrl] = useState(null);
  const [documentType, setDocumentType] = useState(null);

  const handleFetchLatestFile = () => {
    dispatch(fetchLatestFile())
      .unwrap()
      .then((filePath) => {
        if (typeof filePath !== "string") {
          throw new Error("Invalid document URL");
        }

        const fullUrl = `${API_URL}${filePath}`;
        console.log("Full URL:", fullUrl);

        const fileType = getFileType(filePath);
        if (!fileType) {
          throw new Error("Unsupported file type");
        }

        fetch(fullUrl, { method: "HEAD" })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch the document");
            }
            setDocumentUrl(fullUrl);
            setDocumentType(fileType);
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

  useEffect(() => {
    if (status === "failed") {
      toast.error(`Error: ${errorMessage}`);
    }
  }, [status, errorMessage]);

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
            className="btn btn-info mt-2"
          >
            View Latest File
          </button>
        )}

        {status === "succeeded" && documentUrl && documentType && (
          <div>
            <DocViewer
              documents={[{ uri: documentUrl, fileType: documentType }]}
              pluginRenderers={DocViewerRenderers}
            />
          </div>
        )}

        {status === "failed" && (
          <div className="alert alert-danger mt-3">
            {errorMessage || "Failed to load document."}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;
