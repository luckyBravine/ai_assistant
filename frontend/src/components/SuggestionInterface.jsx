// // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import { useState } from 'react'

// // // // function SuggestionInterface({ id, accept, reject }) {
// // // //   // const dispatch = useDispatch();
// // // //   const [isGrammarVisible, setIsGrammarVisible] = useState(true);
// // // //   const [isStyleVisible, setIsStyleVisible] = useState(true);
// // // //   const [isClarityVisible, setIsClarityVisible] = useState(true);

// // // //   const [suggestionType, setSuggestionType] = useState("grammar");

// // // //   const handleRemoveGrammarCard = () => {
// // // //     setIsGrammarVisible(false);
// // // //   };

// // // //   const handleRemoveStyleCard = () => {
// // // //     setIsStyleVisible(false);
// // // //   };

// // // //   const handleRemoveClarityCard = () => {
// // // //     setIsClarityVisible(false);
// // // //   };

// // // //   const grammarSuggestion = (
// // // //     <>
// // // //       {isGrammarVisible && (
// // // //         <div className="card">
// // // //           <div className="card-body">
// // // //             <h5 className="card-title">Grammar Check</h5>
// // // //             <p className="card-text">
// // // //               Ensure your document is grammatically correct
// // // //             </p>
// // // //             <div className="flex justify-between ms-auto">
// // // //             <button onClick={() => handleApplySuggestions("grammar")} className="btn btn-primary">
// // // //                 Apply
// // // //               </button>
// // // //               <button onClick={handleRemoveGrammarCard} className="btn btn-danger mr-2">
// // // //                 Close
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </>
// // // //   );

// // // //   const styleSuggestion = (
// // // //     <>
// // // //     {isStyleVisible && (
// // // //       <div className="card mt-2">
// // // //       <div className="card-body">
// // // //         <h5 className="card-title">Style Check</h5>
// // // //         <p className="card-text">
// // // //           Document Styling is key for good presentation
// // // //         </p>
// // // //         <div className="flex justify-between ms-auto">
// // // //           <a href="#" className="btn btn-primary">
// // // //             Apply
// // // //           </a>
// // // //           <button onClick={handleRemoveStyleCard} className="btn btn-danger mr-2">
// // // //                 Close
// // // //               </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //     )}
// // // //     </>
// // // //   );

// // // //   const claritySuggestion = (
// // // //     <>
// // // //     {isClarityVisible && (
// // // //       <div className="card mt-2">
// // // //       <div className="card-body">
// // // //         <h5 className="card-title">Clarity Check</h5>
// // // //         <p className="card-text">
// // // //           Clear documents show eloquence.
// // // //         </p>
// // // //         <div className="flex justify-between ms-auto">
// // // //           <a href="#" className="btn btn-primary">
// // // //             Apply
// // // //           </a>
// // // //           <button onClick={handleRemoveClarityCard} className="btn btn-danger mr-2">
// // // //               Close
// // // //             </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //     )}
// // // //     </>
// // // //   );

// // // //   return (
// // // //     <div>
// // // //       {grammarSuggestion}
// // // //       {styleSuggestion}
// // // //       {claritySuggestion}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default SuggestionInterface;

// // // import { useDispatch, useSelector } from "react-redux";
// // // import { useState } from "react";
// // // import {
// // //   fetchSuggestions,
// // //   postSuggestions,
// // //   uploadUpdatedDocument,
// // // } from "../features/document"; // Import the thunk for posting updated documents
// // // import { toast } from "sonner";

// // // function SuggestionInterface() {
// // //   const dispatch = useDispatch();
// // //   const {
// // //     currentFile,
// // //     status,
// // //     errorMessage,
// // //     loading,
// // //   } = useSelector((state) => state.file);
// // //   const [isGrammarVisible, setIsGrammarVisible] = useState(true);
// // //   const [isStyleVisible, setIsStyleVisible] = useState(true);
// // //   const [isClarityVisible, setIsClarityVisible] = useState(true);
// // //   const [suggestionType, setSuggestionType] = useState("grammar");

// // //   const handleFetchSuggestions = () => {
// // //     if (status === "succeeded") {
// // //       if (currentFile?.id) {
// // //         dispatch(fetchSuggestions({ docId: currentFile.id, suggestionType }))
// // //           .unwrap()
// // //           .then(() => {
// // //             toast.success("Suggestions fetched successfully");
// // //           })
// // //           .catch((error) => {
// // //             toast.error(`Error fetching suggestions: ${error.message}`);
// // //           });
// // //       }
// // //     }
// // //   };

// // //   const handleApplySuggestions = (suggestionsType) => {
// // //     if (status === "succeeded") {
// // //       if (currentFile?.id) {
// // //         dispatch(
// // //           postSuggestions({
// // //             docId: currentFile.id,
// // //             suggestions: { type: suggestionsType },
// // //           })
// // //         )
// // //           .unwrap()
// // //           .then((updatedDocument) => {
// // //             // Dispatch action to upload the updated document
// // //             dispatch(
// // //               uploadUpdatedDocument({ docId: currentFile.id, updatedDocument })
// // //             )
// // //               .unwrap()
// // //               .then(() => {
// // //                 toast.success(
// // //                   "Suggestions applied and document updated successfully"
// // //                 );
// // //               })
// // //               .catch((error) => {
// // //                 toast.error(
// // //                   `Error uploading updated document: ${error.message}`
// // //                 );
// // //               });
// // //           })
// // //           .catch((error) => {
// // //             toast.error(`Error applying suggestions: ${error.message}`);
// // //           });
// // //       }
// // //     }
// // //   };

// // //   const handleRemoveGrammarCard = () => {
// // //     setIsGrammarVisible(false);
// // //   };

// // //   const handleRemoveStyleCard = () => {
// // //     setIsStyleVisible(false);
// // //   };

// // //   const handleRemoveClarityCard = () => {
// // //     setIsClarityVisible(false);
// // //   };

// // //   const grammarSuggestion = (
// // //     <>
// // //       {isGrammarVisible && (
// // //         <div className="card">
// // //           <div className="card-body">
// // //             <h5 className="card-title">Grammar Check</h5>
// // //             <p className="card-text">
// // //               Ensure your document is grammatically correct
// // //             </p>
// // //             <div className="flex justify-between ms-auto">
// // //               <button
// // //                 onClick={() => handleApplySuggestions("grammar")}
// // //                 className="btn btn-primary"
// // //               >
// // //                 Apply
// // //               </button>
// // //               <button
// // //                 onClick={handleRemoveGrammarCard}
// // //                 className="btn btn-danger mr-2"
// // //               >
// // //                 Close
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );

// // //   const styleSuggestion = (
// // //     <>
// // //       {isStyleVisible && (
// // //         <div className="card mt-2">
// // //           <div className="card-body">
// // //             <h5 className="card-title">Style Check</h5>
// // //             <p className="card-text">
// // //               Document Styling is key for good presentation
// // //             </p>
// // //             <div className="flex justify-between ms-auto">
// // //               <button
// // //                 onClick={() => handleApplySuggestions("style")}
// // //                 className="btn btn-primary"
// // //               >
// // //                 Apply
// // //               </button>
// // //               <button
// // //                 onClick={handleRemoveStyleCard}
// // //                 className="btn btn-danger mr-2"
// // //               >
// // //                 Close
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );

// // //   const claritySuggestion = (
// // //     <>
// // //       {isClarityVisible && (
// // //         <div className="card mt-2">
// // //           <div className="card-body">
// // //             <h5 className="card-title">Clarity Check</h5>
// // //             <p className="card-text">Clear documents show eloquence.</p>
// // //             <div className="flex justify-between ms-auto">
// // //               <button
// // //                 onClick={() => handleApplySuggestions("clarity")}
// // //                 className="btn btn-primary"
// // //               >
// // //                 Apply
// // //               </button>
// // //               <button
// // //                 onClick={handleRemoveClarityCard}
// // //                 className="btn btn-danger mr-2"
// // //               >
// // //                 Close
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );

// // //   return (
// // //     <div>
// // //       {grammarSuggestion}
// // //       {styleSuggestion}
// // //       {claritySuggestion}
// // //       {loading && <p>Loading...</p>}
// // //       {status === "failed" && <p>Error: {errorMessage}</p>}
// // //     </div>
// // //   );
// // // }

// // // export default SuggestionInterface;

// // import { useDispatch, useSelector } from "react-redux";
// // import { useState, useEffect } from "react";
// // import document, {
// //   fetchSuggestions,
// //   postSuggestions,
// //   uploadUpdatedDocument,
// // } from "../features/document";
// // import { toast } from "sonner";

// // function SuggestionInterface() {
// //   const dispatch = useDispatch();
// //   const { currentFile, files, status, errorMessage, loading } = useSelector((state) => state.file || {});
// //   const [isGrammarVisible, setIsGrammarVisible] = useState(true);
// //   const [isStyleVisible, setIsStyleVisible] = useState(true);
// //   const [isClarityVisible, setIsClarityVisible] = useState(true);
// //   const [suggestionType, setSuggestionType] = useState("grammar");

// //   useEffect(() => {
// //     if (status === "succeeded" && files?.id) {
// //       handleFetchSuggestions();
// //       console.log(files?.id)
// //     }
// //   }, [status, files]);

// //   const handleFetchSuggestions = async () => {
// //     try {
// //       await dispatch(fetchSuggestions({ docId: files?.id, suggestionType })).unwrap();
// //       console.log(document?.files.id)
// //       console.log('Hello')
// //       toast.success("Suggestions fetched successfully");
// //     } catch (error) {
// //       toast.error(`Error fetching suggestions: ${error.message}`);
// //     }
// //   };

// //   const handleApplySuggestions = async (suggestionsType) => {
// //     try {
// //       await dispatch(postSuggestions({ docId: files?.id, suggestions: { type: suggestionsType } })).unwrap();
// //       await dispatch(uploadUpdatedDocument({ docId: files?.id, updatedDocument: currentFile })).unwrap();
// //       console.log(document?.files.id)
// //       console.log(suggestionsType)
// //       toast.success("Suggestions applied and document updated successfully");
// //     } catch (error) {
// //       toast.error(`Error applying suggestions: ${error.message}`);
// //     }
// //   };

// //   const handleRemoveGrammarCard = () => {
// //     setIsGrammarVisible(false);
// //   };

// //   const handleRemoveStyleCard = () => {
// //     setIsStyleVisible(false);
// //   };

// //   const handleRemoveClarityCard = () => {
// //     setIsClarityVisible(false);
// //   };

// //   const grammarSuggestion = (
// //     <>
// //       {isGrammarVisible && (
// //         <div className="card">
// //           <div className="card-body">
// //             <h5 className="card-title">Grammar Check</h5>
// //             <p className="card-text">Ensure your document is grammatically correct</p>
// //             <div className="flex justify-between ms-auto">
// //               <button onClick={() => handleApplySuggestions("grammar")} className="btn btn-primary">
// //                 Apply
// //               </button>
// //               <button onClick={handleRemoveGrammarCard} className="btn btn-danger mr-2">
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );

// //   const styleSuggestion = (
// //     <>
// //       {isStyleVisible && (
// //         <div className="card mt-2">
// //           <div className="card-body">
// //             <h5 className="card-title">Style Check</h5>
// //             <p className="card-text">Document Styling is key for good presentation</p>
// //             <div className="flex justify-between ms-auto">
// //               <button onClick={() => handleApplySuggestions("style")} className="btn btn-primary">
// //                 Apply
// //               </button>
// //               <button onClick={handleRemoveStyleCard} className="btn btn-danger mr-2">
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );

// //   const claritySuggestion = (
// //     <>
// //       {isClarityVisible && (
// //         <div className="card mt-2">
// //           <div className="card-body">
// //             <h5 className="card-title">Clarity Check</h5>
// //             <p className="card-text">Clear documents show eloquence.</p>
// //             <div className="flex justify-between ms-auto">
// //               <button onClick={() => handleApplySuggestions("clarity")} className="btn btn-primary">
// //                 Apply
// //               </button>
// //               <button onClick={handleRemoveClarityCard} className="btn btn-danger mr-2">
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );

// //   return (
// //     <div>
// //       {grammarSuggestion}
// //       {styleSuggestion}
// //       {claritySuggestion}
// //       {loading && <p>Loading...</p>}
// //       {status === "failed" && <p>Error: {errorMessage}</p>}
// //     </div>
// //   );
// // }

// // export default SuggestionInterface;

// import { useDispatch, useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import {
//   fetchSuggestions,
//   postSuggestions,
//   uploadUpdatedDocument,
// } from "../features/document"; // Import the thunks
// import { toast } from "sonner";

// function SuggestionInterface() {
//   const dispatch = useDispatch();
//   const { currentFile, files, status, errorMessage, loading } = useSelector((state) => state.file || {});
//   const [isGrammarVisible, setIsGrammarVisible] = useState(true);
//   const [isStyleVisible, setIsStyleVisible] = useState(true);
//   const [isClarityVisible, setIsClarityVisible] = useState(true);

//   const handleFetchSuggestions = async () => {
//     try {
//       if (files?.id && status === "succeeded") {
//         await dispatch(fetchSuggestions({ docId: files.id, suggestionType: "grammar" })).unwrap();
//         toast.success("Suggestions fetched successfully");
//       }
//     } catch (error) {
//       toast.error(`Error fetching suggestions: ${error.message}`);
//     }
//   };

//   const handleApplySuggestions = async (suggestionType) => {
//     try {
//       if (files?.id && status === "succeeded") {
//         const updatedDocument = await dispatch(postSuggestions({
//           docId: files.id,
//           suggestions: { type: suggestionType },
//         })).unwrap();

//         await dispatch(uploadUpdatedDocument({ docId: files.id, updatedDocument })).unwrap();
//         toast.success("Suggestions applied and document updated successfully");
//       }
//     } catch (error) {
//       toast.error(`Error applying suggestions: ${error.message}`);
//     }
//   };

//   const handleRemoveGrammarCard = () => {
//     setIsGrammarVisible(false);
//   };

//   const handleRemoveStyleCard = () => {
//     setIsStyleVisible(false);
//   };

//   const handleRemoveClarityCard = () => {
//     setIsClarityVisible(false);
//   };

//   const grammarSuggestion = (
//     <>
//       {isGrammarVisible && (
//         <div className="card">
//           <div className="card-body">
//             <h5 className="card-title">Grammar Check</h5>
//             <p className="card-text">Ensure your document is grammatically correct</p>
//             <div className="flex justify-between ms-auto">
//               <button onClick={() => handleApplySuggestions("grammar")} className="btn btn-primary">
//                 Apply
//               </button>
//               <button onClick={handleRemoveGrammarCard} className="btn btn-danger mr-2">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );

//   const styleSuggestion = (
//     <>
//       {isStyleVisible && (
//         <div className="card mt-2">
//           <div className="card-body">
//             <h5 className="card-title">Style Check</h5>
//             <p className="card-text">Document Styling is key for good presentation</p>
//             <div className="flex justify-between ms-auto">
//               <button onClick={() => handleApplySuggestions("style")} className="btn btn-primary">
//                 Apply
//               </button>
//               <button onClick={handleRemoveStyleCard} className="btn btn-danger mr-2">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );

//   const claritySuggestion = (
//     <>
//       {isClarityVisible && (
//         <div className="card mt-2">
//           <div className="card-body">
//             <h5 className="card-title">Clarity Check</h5>
//             <p className="card-text">Clear documents show eloquence.</p>
//             <div className="flex justify-between ms-auto">
//               <button onClick={() => handleApplySuggestions("clarity")} className="btn btn-primary">
//                 Apply
//               </button>
//               <button onClick={handleRemoveClarityCard} className="btn btn-danger mr-2">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );

//   return (
//     <div>
//       {grammarSuggestion}
//       {styleSuggestion}
//       {claritySuggestion}
//       {loading && <p>Loading...</p>}
//       {status === "failed" && <p>Error: {errorMessage}</p>}
//     </div>
//   );
// }

// export default SuggestionInterface;

// import { useDispatch, useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import {
//   fetchSuggestions,
//   postSuggestions,
//   uploadUpdatedDocument,
// } from "../features/document"; // Import the thunks
// import { toast } from "sonner";

// function SuggestionInterface() {
//   const dispatch = useDispatch();
//   const {  files, status, errorMessage, loading } = useSelector((state) => state.file || {});
//   const [suggestions, setSuggestions] = useState({});
//   const [visibleSuggestions, setVisibleSuggestions] = useState({
//     grammar: true,
//     style: true,
//     clarity: true,
//   });

//   useEffect(() => {
//     if (files?.id && status === "succeeded") {
//       fetchAllSuggestions();
//     }
//   }, [files, status]);

//   const fetchAllSuggestions = async () => {
//     try {
//       // Fetch suggestions for all types
//       const grammarSuggestions = await dispatch(fetchSuggestions({ docId: files.id, suggestionType: "grammar" })).unwrap();
//       const styleSuggestions = await dispatch(fetchSuggestions({ docId: files.id, suggestionType: "style" })).unwrap();
//       const claritySuggestions = await dispatch(fetchSuggestions({ docId: files.id, suggestionType: "clarity" })).unwrap();
      
//       setSuggestions({
//         grammar: grammarSuggestions,
//         style: styleSuggestions,
//         clarity: claritySuggestions,
//       });

//       console.log(setSuggestions, 'fetchALL')
//     } catch (error) {
//       toast.error(`Error fetching suggestions: ${error.message}`);
//     }
//   };

//   const handleApplySuggestions = async (suggestionType) => {
//     try {
//       if (files?.id && status === "succeeded") {
//         const updatedDocument = await dispatch(postSuggestions({
//           docId: files.id,
//           suggestions: { type: suggestionType, suggestions: suggestions[suggestionType] },
//         })).unwrap();

//         console.log('insside')

//         await dispatch(uploadUpdatedDocument({ docId: files.id, updatedDocument })).unwrap();
//         toast.success("Suggestions applied and document updated successfully");
//         setVisibleSuggestions(prevState => ({ ...prevState, [suggestionType]: false }));
//       }
//     } catch (error) {
//       toast.error(`Error applying suggestions: ${error.message}`);
//     }
//   };

//   const handleRemoveCard = (type) => {
//     setVisibleSuggestions(prevState => ({ ...prevState, [type]: false }));
//   };

//   const renderSuggestionCard = (type, title, description) => (
//     <>
//       {visibleSuggestions[type] && (
//         <div className="card mt-2">
//           <div className="card-body">
//             <h5 className="card-title">{title}</h5>
//             <p className="card-text">{description}</p>
//             <div className="flex justify-between ms-auto">
//               <button onClick={() => handleApplySuggestions(type)} className="btn btn-primary">
//                 Apply
//               </button>
//               <button onClick={() => handleRemoveCard(type)} className="btn btn-danger mr-2">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );

//   return (
//     <div>
//       {renderSuggestionCard("grammar", "Grammar Check", "Ensure your document is grammatically correct")}
//       {renderSuggestionCard("style", "Style Check", "Document Styling is key for good presentation")}
//       {renderSuggestionCard("clarity", "Clarity Check", "Clear documents show eloquence.")}

//       {loading && <p>Loading...</p>}
//       {status === "failed" && <p>Error: {errorMessage}</p>}
//     </div>
//   );
// }

// export default SuggestionInterface;


//start here by changing how to access the File and passing it through the NLTK script then upload  it pass the document not the document's ID 

// import { useDispatch, useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import {
//   fetchSuggestions,
//   postSuggestions,
//   uploadUpdatedDocument,
// } from "../features/document"; // Import the thunks
// import { toast } from "sonner";

// function SuggestionInterface() {
//   const dispatch = useDispatch();
//   const { files, currentFile, status, errorMessage, loading } = useSelector((state) => state.document || {});
//   const [suggestions, setSuggestions] = useState({});
//   const [visibleSuggestions, setVisibleSuggestions] = useState({
//     grammar: true,
//     style: true,
//     clarity: true,
//   });

//   useEffect(() => {
//     if (files?.id && status === "succeeded") {
//       fetchAllSuggestions();
//       console.log(files?.id)
//     }
//   }, [files, status]);

//   const fetchAllSuggestions = async () => {
//     try {
//       // Fetch suggestions for all types
//       const grammarSuggestions = await dispatch(fetchSuggestions({ doc: currentFile, suggestionType: "grammar" })).unwrap();
//       const styleSuggestions = await dispatch(fetchSuggestions({ doc: currentFile, suggestionType: "style" })).unwrap();
//       const claritySuggestions = await dispatch(fetchSuggestions({ doc: currentFile, suggestionType: "clarity" })).unwrap();
//       console.log(files?.id)
//       setSuggestions({
//         grammar: grammarSuggestions,
//         style: styleSuggestions,
//         clarity: claritySuggestions,
//       });

//       console.log('Fetched suggestions:', { grammarSuggestions, styleSuggestions, claritySuggestions });
//     } catch (error) {
//       toast.error(`Error fetching suggestions: ${error.message}`);
//       console.error(error);
//     }
//   };

//   const handleApplySuggestions = async (suggestionType) => {
//     console.log('Button clicked with type:', suggestionType);
//     try {
//       console.log('inside try catch', status, files?.id, currentFile);
//       if (currentFile && status === "succeeded") {
//         console.log('Applying suggestions:', { docId: files.id, suggestions: suggestions[suggestionType] });
//         console.log(files?.id)
//         const updatedDocument = await dispatch(postSuggestions({
//           doc:currentFile,
//           suggestions: { type: suggestionType, suggestions: suggestionType },
//         })).unwrap();

//         console.log('Updated document:', updatedDocument);
//         // docId: files.id,docId: files.id,

//         await dispatch(uploadUpdatedDocument({  doc: currentFile, updatedDocument })).unwrap();
//         toast.success("Suggestions applied and document updated successfully");
//         setVisibleSuggestions(prevState => ({ ...prevState, [suggestionType]: false }));
//       }
//     } catch (error) {
//       toast.error(`Error applying suggestions: ${error.message}`);
//       console.error(error);
//     }
//   };

//   const handleRemoveCard = (type) => {
//     setVisibleSuggestions(prevState => ({ ...prevState, [type]: false }));
//   };

//   const renderSuggestionCard = (type, title, description) => (
//     <>
//       {visibleSuggestions[type] && (
//         <div className="card mt-2">
//           <div className="card-body">
//             <h5 className="card-title">{title}</h5>
//             <p className="card-text">{description}</p>
//             <div className="flex justify-between ms-auto">
//               <button onClick={() => handleApplySuggestions(type)} className="btn btn-primary">
//                 Apply
//               </button>
//               <button onClick={() => handleRemoveCard(type)} className="btn btn-danger mr-2">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );

//   return (
//     <div>
//       {renderSuggestionCard("grammar", "Grammar Check", "Ensure your document is grammatically correct")}
//       {renderSuggestionCard("style", "Style Check", "Document Styling is key for good presentation")}
//       {renderSuggestionCard("clarity", "Clarity Check", "Clear documents show eloquence.")}

//       {loading && <p>Loading...</p>}
//       {status === "failed" && <p>Error: {errorMessage}</p>}
//     </div>
//   );
// }

// export default SuggestionInterface;

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  fetchSuggestions,
  postSuggestions,
  uploadUpdatedDocument,
} from "../features/document"; // Import the thunks
import { toast } from "sonner";

function SuggestionInterface() {
  const dispatch = useDispatch();
  const { currentFile, status, errorMessage, loading } = useSelector((state) => state.document || {});
  const [isGrammarVisible, setIsGrammarVisible] = useState(true);
  const [isStyleVisible, setIsStyleVisible] = useState(true);
  const [isClarityVisible, setIsClarityVisible] = useState(true);
  // files,
  const handleApplyAndFetchSuggestions = async (suggestionType) => {
    try {
      if (currentFile && status === "succeeded") {
        // Step 1: Fetch Suggestions
        const fetchedSuggestions = await dispatch(fetchSuggestions({
          doc: currentFile,
          suggestionType: suggestionType,
        })).unwrap();
  
        // Step 2: Apply Suggestions
        const updatedDocument = await dispatch(postSuggestions({
          doc: currentFile,
          suggestions: fetchedSuggestions, // Use the fetched suggestions
        })).unwrap();
  
        // Step 3: Upload Updated Document
        await dispatch(uploadUpdatedDocument({
          doc: currentFile,
          updatedDocument,
        })).unwrap();
  
        toast.success("Suggestions fetched, applied, and document updated successfully");
      }
    } catch (error) {
      toast.error(`Error in handling suggestions and document update: ${error.message}`);
    }
  };
  

  // const handleFetchSuggestions = async () => {
  //   try {
  //     if (currentFile && status === "succeeded") {
  //       await dispatch(fetchSuggestions({ docId: files.id, suggestionType: "grammar" })).unwrap();
  //       toast.success("Suggestions fetched successfully");
  //     }
  //   } catch (error) {
  //     toast.error(`Error fetching suggestions: ${error.message}`);
  //   }
  // };

  // const handleApplySuggestions = async (suggestionType) => {
  //   try {
  //     if (files?.id && status === "succeeded") {
  //       const updatedDocument = await dispatch(postSuggestions({
  //         docId: files.id,
  //         suggestions: { type: suggestionType },
  //       })).unwrap();

  //       await dispatch(uploadUpdatedDocument({ docId: files.id, updatedDocument })).unwrap();
  //       toast.success("Suggestions applied and document updated successfully");
  //     }
  //   } catch (error) {
  //     toast.error(`Error applying suggestions: ${error.message}`);
  //   }
  // };

  const handleRemoveGrammarCard = () => {
    setIsGrammarVisible(false);
  };

  const handleRemoveStyleCard = () => {
    setIsStyleVisible(false);
  };

  const handleRemoveClarityCard = () => {
    setIsClarityVisible(false);
  };

  const grammarSuggestion = (
    <>
      {isGrammarVisible && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Grammar Check</h5>
            <p className="card-text">Ensure your document is grammatically correct</p>
            <div className="flex justify-between ms-auto">
              <button onClick={() => handleApplyAndFetchSuggestions("grammar")} className="btn btn-primary">
                Apply
              </button>
              <button onClick={handleRemoveGrammarCard} className="btn btn-danger mr-2">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const styleSuggestion = (
    <>
      {isStyleVisible && (
        <div className="card mt-2">
          <div className="card-body">
            <h5 className="card-title">Style Check</h5>
            <p className="card-text">Document Styling is key for good presentation</p>
            <div className="flex justify-between ms-auto">
              <button onClick={() => handleApplyAndFetchSuggestions("style")} className="btn btn-primary">
                Apply
              </button>
              <button onClick={handleRemoveStyleCard} className="btn btn-danger mr-2">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const claritySuggestion = (
    <>
      {isClarityVisible && (
        <div className="card mt-2">
          <div className="card-body">
            <h5 className="card-title">Clarity Check</h5>
            <p className="card-text">Clear documents show eloquence.</p>
            <div className="flex justify-between ms-auto">
              <button onClick={() => handleApplyAndFetchSuggestions("clarity")} className="btn btn-primary">
                Apply
              </button>
              <button onClick={handleRemoveClarityCard} className="btn btn-danger mr-2">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div>
      {grammarSuggestion}
      {styleSuggestion}
      {claritySuggestion}
      {loading && <p>Loading...</p>}
      {status === "failed" && <p>Error: {errorMessage}</p>}
    </div>
  );
}

export default SuggestionInterface;
