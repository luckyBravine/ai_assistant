import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { DocumentViewer, Upload, SuggestionInterface } from "../components";

const DashboardPage = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.user
  );

  if (!isAuthenticated && isLoading && user === null) return <Navigate to="/LoginPage" />;
  
  return (
    <Layout title="AI Assistant | Dashboard" content="Dashboard">
      <div className="d-flex justify-content-center align-items-center vh-100 w-100 container">
        <div className="row">
          <div className="col-4">
            <SuggestionInterface />
          </div>
          <div className="col-md-8">
            <div className="">
              <Upload />
            </div>
            <div>
              <DocumentViewer />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
