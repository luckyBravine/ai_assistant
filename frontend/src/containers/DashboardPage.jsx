import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.user
  );

  if (!isAuthenticated && isLoading && user === null)
    <Navigate to="/LoginPage" />;
  return (
    <Layout title="AI Assistant | Dashboard" content="Dashboard">
      {isLoading || user === null ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="mt-10">
          <h2>Dashboard</h2>
          <p>user details</p>
          <ul>
            <li>Username: {user.username}</li>
            <li>Username: {user.email}</li>
          </ul>
        </div>
      )}
    </Layout>
  );
};

export default DashboardPage;
