import { useState } from "react";
import { toast } from "sonner";

//bring in redux
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../features/document";

const Upload = () => {
  const [filename, setFilename] = useState("");
  const dispatch = useDispatch();
  const { errorMessage, status, loading } = useSelector(
    (state) => state.document
  );

  const saveFile = () => {
    try {
      console.log(filename);
      dispatch(uploadFile(filename));
      toast.success(status);
    } catch (error) {
      toast.error(errorMessage.document);
    }
  };

  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="upload file" className="float-left">
          Browse a document
        </label>
        <input
          type="file"
          onChange={(e) => setFilename(e.target.files[0])}
          className="form-control"
        />
      </div>

      <div className="form-group my-2">
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button
            className="btn btn-primary float-left mt-2"
            type="button"
            onClick={saveFile}
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default Upload;
