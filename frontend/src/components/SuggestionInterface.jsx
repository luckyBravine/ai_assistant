// import { useDispatch, useSelector } from 'react-redux';

function SuggestionInterface({ id, accept, reject }) {
  // const dispatch = useDispatch();

  const grammarSuggestion = (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Grammar Check</h5>
          <p className="card-text">
            Ensure your document is grammatically correct
          </p>
          <div className="flex justify-between ms-auto">
            <a href="#" className="btn btn-primary">
              Apply
            </a>
            <a href="#" className="btn btn-danger mr-2">
              Close
            </a>
          </div>
        </div>
      </div>
    </>
  );

  const styleSuggestion = (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Style Check</h5>
          <p className="card-text">
            Document Styling is key for good presentation
          </p>
          <div className="flex justify-between ms-auto">
            <a href="#" className="btn btn-primary">
              Apply
            </a>
            <a href="#" className="btn btn-danger mr-2">
              Close
            </a>
          </div>
        </div>
      </div>
    </>
  );

  const claritySuggestion = (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Clarity Check</h5>
          <p className="card-text">
            Clear documents show eloquence.
          </p>
          <div className="flex justify-between ms-auto">
            <a href="#" className="btn btn-primary">
              Apply
            </a>
            <a href="#" className="btn btn-danger mr-2">
              Close
            </a>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div>
      {grammarSuggestion}
      {styleSuggestion}
      {claritySuggestion}
    </div>
  );
}

export default SuggestionInterface;
