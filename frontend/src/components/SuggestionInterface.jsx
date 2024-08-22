import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  postSuggestions,
  postContents
} from "../features/document"; // Import the thunks
import { toast } from "sonner";

function SuggestionInterface() {
  const dispatch = useDispatch();
  const { improvedDocument, content, status, errorMessage, loading } = useSelector((state) => state.document || {});
  const [isGrammarVisible, setIsGrammarVisible] = useState(true);
  const [isStyleVisible, setIsStyleVisible] = useState(true);
  const [isClarityVisible, setIsClarityVisible] = useState(true);

  const handlePostSuggestions = async (suggestionType) => {
    try {
      const formData = new FormData();
      formData.append('content', content);  // Pass the content as a string
      formData.append('suggestionType', suggestionType);  // Pass the suggestion type
  
      console.log(content, formData, suggestionType);
  
      // Dispatch the thunk action
      dispatch(postSuggestions({
        suggestionType,
        content,  // Pass the content as a string
      }));
  
      toast.success(`Successfully passed ${suggestionType} as your suggestion`);

      const improvedContent = improvedDocument.updated_content

      await dispatch(postContents({
        improvedContent, // Pass the file to handleFileUploadAndCombine
        content,
      })).unwrap();
    } catch (error) {
      toast.error(`Error occurred: ${error.message}`);
    }
  };
  

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
              <button onClick={() => handlePostSuggestions("grammar")} className="btn btn-primary">
                Accept
              </button>
              <button onClick={handleRemoveGrammarCard} className="btn btn-danger mr-2">
                Reject
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
              <button onClick={() => handlePostSuggestions("style")} className="btn btn-primary">
                Accept
              </button>
              <button onClick={handleRemoveStyleCard} className="btn btn-danger mr-2">
                Reject
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
              <button onClick={() => handlePostSuggestions("clarity")} className="btn btn-primary">
                Accept
              </button>
              <button onClick={handleRemoveClarityCard} className="btn btn-danger mr-2">
                Reject
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
