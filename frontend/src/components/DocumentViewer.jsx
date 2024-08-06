
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLatestFile } from "../features/document";
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";

// import { toast } from "sonner";
// import {useState} from 'react'

// const DocumentViewer = () => {
//   const dispatch = useDispatch();

//   const { currentFile, status, loading, errorMessage } = useSelector(
//     (state) => state.document
//   );

//   const [documentUrl, setDocumentUrl] = useState(null);

//   // const handleFetchLatestFile = () => {
//   //   dispatch(fetchLatestFile())
//   //     .unwrap()
//   //     .then((response) => {
//   //        const lopin = response.files.document
//   //        console.log(lopin)
//   //       toast.success("Latest file fetched successfully");
//   //     })
//   //     .catch((error) => {
//   //       toast.error(`Error fetching latest file: ${error}`);
//   //     });
//   // };

//   const handleFetchLatestFile = () => {
//     dispatch(fetchLatestFile())
//       .unwrap()
//       .then((response) => {
//         const mimeType = getMimeTypeFromUrl(response.document);
//         // const fileUrl = URL.createObjectURL(new Blob([response.document], { type: mimeType }));
//         const fileUrl = URL.createObjectURL(
//           new Blob([response.document], { type: mimeType })
//         );
//         setDocumentUrl(fileUrl);
//         toast.success("Latest file fetched successfully");
//       })
//       .catch((error) => {
//         toast.error(`Error fetching latest file: ${error}`);
//       });
//   };

//   const getMimeTypeFromUrl = (url) => {
//     if (typeof url !== 'string') {
//       throw new Error('Document URL is not a string');
//     }
  
//     if (url.match(/\.pdf$/i)) return 'application/pdf';
//     if (url.match(/\.json$/i)) return 'application/json';
//     if (url.match(/\.docx$/i)) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
//     if (url.match(/\.pptx$/i)) return 'application/vnd.ms-powerpoint';
//     return 'application/octet-stream'; // Default MIME type for unknown files
//   };
//   return (
//     <div>
//       <div>
//         <button onClick={handleFetchLatestFile} disabled={loading}>
//           {loading ? "Loading..." : "Fetch Latest File"}
//         </button>
//         {status === "succeeded" && currentFile && (
//           <div>
//             <h2>Latest Uploaded File</h2>
//             <p>ID: {currentFile.id}</p>
//             <p>Document: {currentFile}</p>
//             {documentUrl && (
//               <DocViewer
//                 documents={[{ uri: documentUrl }]}
//                 pluginRenderers={DocViewerRenderers}
//               />
//             )}
//           </div>
//         )}
//         {status === "failed" && <p>Error: {errorMessage}</p>}
//       </div>
//     </div>
//   );
// };

// export default DocumentViewer;


import { useDispatch, useSelector } from "react-redux";
import { fetchLatestFile } from "../features/document";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { toast } from "sonner";
import { useState } from "react";
import { API_URL } from "../config/index";

// Define a function to determine MIME type based on file extension
const getMimeType = (url) => {
  const extension = url.split('.').pop();
  const mimeTypes = {
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'txt': 'text/plain',
    // Add other file types as needed
  };
  return mimeTypes[extension] || 'application/octet-stream';
};

const DocumentViewer = () => {
  const dispatch = useDispatch();
  const { currentFile, status, loading, errorMessage } = useSelector(
    (state) => state.document
  );
  const [documentUrl, setDocumentUrl] = useState(null);

  const handleFetchLatestFile = () => {
    dispatch(fetchLatestFile())
      .unwrap()
      .then((filePath) => {
        
        if (typeof filePath !== 'string') {
          throw new Error('Document URL is not a string');
        }

        const fullUrl = `${API_URL}${filePath}`;
        console.log('Full URL:', fullUrl);

        // Determine MIME type (if needed for validation)
        const mimeType = getMimeType(fullUrl);
        console.log('Detected MIME Type:', mimeType);

        // Optionally validate the MIME type against the fetched document
        fetch(fullUrl, { method: 'HEAD' })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to fetch the document');
            }
            setDocumentUrl(fullUrl);
            toast.success("Latest file fetched successfully");
          })
          .catch((error) => {
            console.error('Error fetching document:', error);
            toast.error(`Error fetching latest file: ${error.message}`);
          });
      })
      .catch((error) => {
        console.error('Error fetching latest file:', error);
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
              documents={[{ uri: documentUrl }]}
              pluginRenderers={DocViewerRenderers}
            />
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
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";

// import { toast } from "sonner";
// import { useState } from "react";
// import { API_URL } from "../config/index";

// const DocumentViewer = () => {
//   const dispatch = useDispatch();
//   const { currentFile, status, loading, errorMessage } = useSelector(
//     (state) => state.document
//   );
//   const [documentUrl, setDocumentUrl] = useState(null);

//   const handleFetchLatestFile = () => {
//     dispatch(fetchLatestFile())
//       .unwrap()
//       .then((filePath) => {
//         if (typeof filePath !== 'string') {
//           throw new Error('Document URL is not a string');
//         }
        
//         // Assuming filePath is a relative URL, you might need to adjust this base URL
//         const fullUrl = `${API_URL}${filePath}`;
//         setDocumentUrl(fullUrl);
//         toast.success("Latest file fetched successfully");
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
//         {status === "succeeded" && documentUrl && (
//           <div>
//             <h2>Latest Uploaded File</h2>
//             <p>ID: {currentFile?.id}</p>
//             <DocViewer
//               documents={[{ uri: documentUrl }]}
//               pluginRenderers={DocViewerRenderers}
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
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";
// import { toast } from "sonner";
// import { useState } from "react";
// import { API_URL } from "../config/index";

// const DocumentViewer = () => {
//   const dispatch = useDispatch();
//   const { currentFile, status, loading, errorMessage } = useSelector(
//     (state) => state.document
//   );
//   const [documentUrl, setDocumentUrl] = useState(null);

//   const handleFetchLatestFile = () => {
//     dispatch(fetchLatestFile())
//       .unwrap()
//       .then((filePath) => {
//         if (typeof filePath !== 'string') {
//           throw new Error('Document URL is not a string');
//         }

//         // Construct the full URL
//         const fullUrl = `${API_URL}${filePath}`;
//         console.log('Document URL:', fullUrl);

//         // Check if the URL is accessible
//         fetch(fullUrl)
//           .then(response => {
//             if (!response.ok) {
//               throw new Error('Failed to fetch the document');
//             }
//             setDocumentUrl(fullUrl);
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
//         {status === "succeeded" && documentUrl && (
//           <div>
//             <h2>Latest Uploaded File</h2>
//             <p>ID: {currentFile?.id}</p>
//             <DocViewer
//               documents={[{ uri: documentUrl }]}
//               pluginRenderers={DocViewerRenderers}
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
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";
// import { toast } from "sonner";
// import { useState } from "react";
// import { API_URL } from "../config/index";

// const DocumentViewer = () => {
//   const dispatch = useDispatch();
//   const { currentFile, status, loading, errorMessage } = useSelector(
//     (state) => state.document
//   );
//   const [documentUrl, setDocumentUrl] = useState(null);

//   const handleFetchLatestFile = () => {
//     dispatch(fetchLatestFile())
//       .unwrap()
//       .then((response) => {
//         // Assuming response contains file path and content type
//         const { filePath, contentType } = response;
//         if (typeof filePath !== 'string' || typeof contentType !== 'string') {
//           throw new Error('Document URL or Content-Type is not a string');
//         }

//         // Construct the full URL
//         const fullUrl = `${API_URL}${filePath}`;
//         console.log('Document URL:', fullUrl);

//         // Check if the URL is accessible
//         fetch(fullUrl, { method: 'HEAD' })
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error('Failed to fetch the document');
//             }
//             setDocumentUrl(fullUrl);
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
//         {status === "succeeded" && documentUrl && (
//           <div>
//             <h2>Latest Uploaded File</h2>
//             <p>ID: {currentFile?.id}</p>
//             <DocViewer
//               documents={[{ uri: documentUrl }]}
//               pluginRenderers={DocViewerRenderers}
//             />
//           </div>
//         )}
//         {status === "failed" && <p>Error: {errorMessage}</p>}
//       </div>
//     </div>
//   );
// };

// export default DocumentViewer;





// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLatestFile } from "../features/document";
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";
// import { toast } from "sonner";

// const DocumentViewer = () => {
//   const dispatch = useDispatch();
//   const { currentFile, status, loading, errorMessage } = useSelector(
//     (state) => state.document
//   );
//   const [documentUrl, setDocumentUrl] = useState(null);

//   const handleFetchLatestFile = () => {
//     dispatch(fetchLatestFile())
//       .unwrap()
//       .then((response) => {
//         // Convert the document content to a Blob and create a URL
//         const fileBlob = new Blob([response.document], { type: 'application/pdf' });
//         const fileUrl = URL.createObjectURL(fileBlob);
//         setDocumentUrl(fileUrl);
//         toast.success("Latest file fetched successfully");
//       })
//       .catch((error) => {
//         toast.error(`Error fetching latest file: ${error}`);
//       });
//   };

//   return (
//     <div>
//       <button onClick={handleFetchLatestFile} disabled={loading}>
//         {loading ? "Loading..." : "Fetch Latest File"}
//       </button>
//       {status === "succeeded" && currentFile && (
//         <div>
//           <h2>Latest Uploaded File</h2>
//           <p>ID: {currentFile.id}</p>
//           {documentUrl && (
//             <DocViewer
//               documents={[{ uri: documentUrl }]}
//               pluginRenderers={DocViewerRenderers}
//             />
//           )}
//         </div>
//       )}
//       {status === "failed" && <p>Error: {errorMessage}</p>}
//     </div>
//   );
// };

// export default DocumentViewer;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLatestFile } from "../features/document";
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";
// import { toast } from "sonner";

// const DocumentViewer = () => {
//   const dispatch = useDispatch();
//   const { currentFile, status, loading, errorMessage } = useSelector(
//     (state) => state.document
//   );
//   const [documentUrl, setDocumentUrl] = useState(null);

//   const handleFetchLatestFile = () => {
//     dispatch(fetchLatestFile())
//       .unwrap()
//       .then((response) => {
//         setDocumentUrl(response.fileUrl);
//         console.log(response, 'client')
//         console.log(response.fileUrl)
//         toast.success("Latest file fetched successfully");
//       })
//       .catch((error) => {
//         toast.error(`Error fetching latest file: ${error}`);
//       });
//   };

//   return (
//     <div>
//       <button onClick={handleFetchLatestFile} disabled={loading}>
//         {loading ? "Loading..." : "Fetch Latest File"}
//       </button>
//       {status === "succeeded" && documentUrl && (
//         <div>
//           <h2>Latest Uploaded File</h2>
//           <DocViewer
//             documents={[{ uri: documentUrl }]}
//             pluginRenderers={DocViewerRenderers}
//           />
//         </div>
//       )}
//       {status === "failed" && <p>Error: {errorMessage}</p>}
//     </div>
//   );
// };

// export default DocumentViewer;
