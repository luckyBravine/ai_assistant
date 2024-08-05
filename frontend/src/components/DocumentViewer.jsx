
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestFile } from "../features/document";
import { toast } from "sonner";

const DocumentViewer = () => {
  const dispatch = useDispatch();

  const { currentFile, status, loading, errorMessage } = useSelector(
    (state) => state.document
  );

  const handleFetchLatestFile = () => {
    dispatch(fetchLatestFile())
      .unwrap()
      .then((response) => {
         const lopin = response.files.document
         console.log(lopin)
        toast.success("Latest file fetched successfully");
      })
      .catch((error) => {
        toast.error(`Error fetching latest file: ${error}`);
      });
  };
 
  return (
    <div>
      <div>
        <button onClick={handleFetchLatestFile} disabled={loading}>
          {loading ? "Loading..." : "Fetch Latest File"}
        </button>
        {status === "succeeded" && currentFile && (
          <div>
            <h2>Latest Uploaded File</h2>
            <p>ID: {currentFile.id}</p>
            <p>Document: {currentFile.document}</p>
          </div>
        )}
        {status === "failed" && <p>Error: {errorMessage}</p>}
      </div>
    </div>
  );
};

export default DocumentViewer;
