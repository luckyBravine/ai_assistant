//  import { useDispatch, useSelector } from "react-redux";
//  import { fetchLatestFile } from "../features/document";
//  import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
//  import "@cyntler/react-doc-viewer/dist/index.css";
//  import { toast } from "sonner";
//  import { useState } from "react";
//  import { API_URL } from "../config/index";
//  import { FileViewer } from 'react-file-viewer-v2'

// // // Define a function to determine MIME type based on file extension
// // const getMimeType = (url) => {
// //   const extension = url.split('.').pop();
// //   const mimeTypes = {
// //     'pdf': 'application/pdf',
// //     'doc': 'application/msword',
// //     'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// //     'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
// //     'txt': 'text/plain',
// //   };
// //   return mimeTypes[extension] || 'application/octet-stream';
// // };

// const getMimeType = (url) => {
//     const extension = url.split('.').pop().toLowerCase();
//     const mimeTypes = {
//       'pdf': 'pdf',
//       'doc': 'doc',
//       'docx': 'docx',
//       'xlsx': 'xlsx',
//       'txt': 'txt',
//     };
//     return mimeTypes[extension] || 'unknown';
//   };

//  const DocumentViewer = () => {
//    const dispatch = useDispatch();
//    const { currentFile, status, loading, errorMessage } = useSelector(
//      (state) => state.document
//    );
//    const [documentUrl, setDocumentUrl] = useState(null);
//    const [documentType, setDocumentType] = useState(null);

//    const handleFetchLatestFile = () => {
//      dispatch(fetchLatestFile())
//        .unwrap()
//        .then((filePath) => {

//          if (typeof filePath !== 'string') {
//            throw new Error('Document URL is not a string');
//          }

//          const fullUrl = `${API_URL}${filePath}`;
//          console.log('Full URL:', fullUrl);

//          // Determine MIME type (if needed for validation)
//          const mimeType = getMimeType(fullUrl);
//          console.log('Detected MIME Type:', mimeType);
//          setDocumentType(mimeType)

//          // Optionally validate the MIME type against the fetched document
//          fetch(fullUrl, { method: 'HEAD' })
//            .then((res) => {
//              if (!res.ok) {
//                throw new Error('Failed to fetch the document');
//              }
//              setDocumentUrl(fullUrl);
//              toast.success("Latest file fetched successfully");
//            })
//            .catch((error) => {
//              console.error('Error fetching document:', error);
//              toast.error(`Error fetching latest file: ${error.message}`);
//            });
//        })
//        .catch((error) => {
//          console.error('Error fetching latest file:', error);
//          toast.error(`Error fetching latest file: ${error.message}`);
//        });
//    };

//    return (
//      <div>
//        <div>
//          <button onClick={handleFetchLatestFile} disabled={loading}>
//            {loading ? "Loading..." : "Fetch Latest File"}
//          </button>
//          {status === "succeeded" && documentUrl && (
//            <div>
//              <h2>Latest Uploaded File</h2>
//               <p>ID: {currentFile?.id}</p>
//               <DocViewer
//                 documents={[{ uri: documentUrl }]}
//                 pluginRenderers={DocViewerRenderers}
//               />
//               {/* <FileViewer
//                   fileType={documentType}
//                   filePath={documentUrl}
//                   onError={(e) => {
//                     console.error('FileViewer Error:', e);
//                     toast.error('Error viewing the file');
//                   }}
//                 /> */}
//             </div>
//           )}
//           {status === "failed" && <p>Error: {errorMessage}</p>}
//         </div>
//       </div>
//    );
// };

//  export default DocumentViewer;

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
  const { currentFile, status, loading, errorMessage } = useSelector(
    (state) => state.document
  );
  const [documentUrl, setDocumentUrl] = useState(null);
  const [documentType, setDocumentType] = useState("default");

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
        {status === "failed" && <p>Error: {errorMessage}</p>}
      </div>
    </div>
  );
};

export default DocumentViewer;

// import { useDispatch, useSelector } from "react-redux";
// import { fetchLatestFile } from "../features/document";
// import { toast } from "sonner";
// import { useState } from "react";
// import { API_URL } from "../config/index";
// import {FileViewer} from 'react-file-viewer-v2';

// // Define a function to determine MIME type based on file extension
// const getMimeType = (url) => {
//   const extension = url.split('.').pop();
//   const mimeTypes = {
//     'pdf': 'pdf',
//     'doc': 'doc',
//     'docx': 'docx',
//     'xlsx': 'xlsx',
//     'txt': 'txt',
//   };
//   return mimeTypes[extension] || 'unknown';
// };

// const DocumentViewer = () => {
//   const dispatch = useDispatch();
//   const { currentFile, status, loading, errorMessage } = useSelector(
//     (state) => state.document
//   );
//   const [fileUrl, setFileUrl] = useState(null);
//   const [fileType, setFileType] = useState('unknown');

//   const handleFetchLatestFile = () => {
//     dispatch(fetchLatestFile())
//       .unwrap()
//       .then((response) => {
//         const { filePath } = response;

//         if (typeof filePath !== 'string') {
//           throw new Error('Document URL is not a string');
//         }

//         const fullUrl = `${API_URL}${filePath}`;
//         const mimeType = getMimeType(fullUrl);
//         console.log('Full URL:', fullUrl);
//         console.log('Detected MIME Type:', mimeType);

//         fetch(fullUrl, { method: 'HEAD' })
//           .then((res) => {
//             if (!res.ok) {
//               throw new Error('Failed to fetch the document');
//             }
//             setFileUrl(fullUrl);
//             setFileType(mimeType);
//             toast.success("Latest file fetched successfully");
//           })
//           .catch((error) => {
//             console.error('Error fetching document:', error);
//             toast.error(`Error fetching latest file: ${error.message}`);
//           });
//       })
//       .catch((error) => {
//         console.error('Error fetching latest file:', error);
//         toast.error(`Error fetching latest file: ${error.message}`);
//       });
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={handleFetchLatestFile} disabled={loading}>
//           {loading ? "Loading..." : "Fetch Latest File"}
//         </button>
//         {status === "succeeded" && fileUrl && (
//           <div>
//             <h2>Latest Uploaded File</h2>
//             <p>ID: {currentFile?.id}</p>
//             <FileViewer
//               fileType={fileType}
//               filePath={fileUrl}
//               onError={(e) => {
//                 console.error('FileViewer Error:', e);
//                 toast.error('Error viewing the file');
//               }}
//             />
//           </div>
//         )}
//         {status === "failed" && <p>Error: {errorMessage}</p>}
//       </div>
//     </div>
//   );
// };

// export default DocumentViewer;

// import { useDispatch, useSelector } from "react-redux";
// import { fetchLatestFile } from "../features/document";
// import { toast } from "sonner";
// import { useState } from "react";
// import { API_URL } from "../config/index";
// import FileViewer from 'react-file-viewer-v2';

// // Define a function to determine MIME type based on file extension
// const getMimeType = (url) => {
//   const extension = url.split('.').pop().toLowerCase();
//   const mimeTypes = {
//     'pdf': 'pdf',
//     'doc': 'doc',
//     'docx': 'docx',
//     'xlsx': 'xlsx',
//     'txt': 'txt',
//   };
//   return mimeTypes[extension] || 'unknown';
// };

// const DocumentViewer = () => {
//   const dispatch = useDispatch();
//   const { currentFile, status, loading, errorMessage } = useSelector(
//     (state) => state.document
//   );
//   const [fileUrl, setFileUrl] = useState(null);
//   const [fileType, setFileType] = useState('unknown');

//   const handleFetchLatestFile = () => {
//     dispatch(fetchLatestFile())
//       .unwrap()
//       .then((response) => {
//         // Ensure response contains filePath
//         if (typeof response.filePath !== 'string') {
//           throw new Error('Invalid filePath received');
//         }

//         const filePath = response.filePath;
//         const fullUrl = `${API_URL}${filePath}`;

//         // Determine MIME type
//         const mimeType = getMimeType(filePath);
//         console.log('Full URL:', fullUrl);
//         console.log('Detected MIME Type:', mimeType);

//         // Check if the URL is valid
//         fetch(fullUrl, { method: 'HEAD' })
//           .then((res) => {
//             if (!res.ok) {
//               throw new Error('Failed to fetch the document');
//             }
//             setFileUrl(fullUrl);
//             setFileType(mimeType);
//             toast.success("Latest file fetched successfully");
//           })
//           .catch((error) => {
//             console.error('Error fetching document:', error);
//             toast.error(`Error fetching latest file: ${error.message}`);
//           });
//       })
//       .catch((error) => {
//         console.error('Error fetching latest file:', error);
//         toast.error(`Error fetching latest file: ${error.message}`);
//       });
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={handleFetchLatestFile} disabled={loading}>
//           {loading ? "Loading..." : "Fetch Latest File"}
//         </button>
//         {status === "succeeded" && fileUrl && (
//           <div>
//             <h2>Latest Uploaded File</h2>
//             <p>ID: {currentFile?.id}</p>
//             <FileViewer
//               fileType={fileType}
//               filePath={fileUrl}
//               onError={(e) => {
//                 console.error('FileViewer Error:', e);
//                 toast.error('Error viewing the file');
//               }}
//             />
//           </div>
//         )}
//         {status === "failed" && <p>Error: {errorMessage}</p>}
//       </div>
//     </div>
//   );
// };

// export default DocumentViewer;
