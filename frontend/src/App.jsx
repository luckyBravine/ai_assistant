import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { DashboardPage, HomePage, RegisterPage, LoginPage } from "./containers";
import { store } from "./store";

// App Component
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/RegisterPage" element={<RegisterPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route
              path="/DashboardPage"
              element={
                <RequireAuth>
                  <DashboardPage />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

// RequireAuth Component for Route Protection
const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return isAuthenticated ? children : <Navigate to="/LoginPage" />;
};

export default App;
