// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import { DashboardPage, HomePage, RegisterPage, LoginPage } from "./containers";
// import { store } from "./store";
// import { useSelector } from "react-redux";


// const App = () => {
//   const { isAuthenticated } = useSelector(
//     (state) => state.user
//   );
//   return (
//     <Provider store={store}>
//       <Router>
//         <div className="container">
          
          
//           {isAuthenticated ? (
//             <Routes>
//             <Route path="/DashboardPage" element={<DashboardPage />} />
//             </Routes>
//           ) : (
//             <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/RegisterPage" element={<RegisterPage />} />
//             <Route path="/LoginPage" element={<LoginPage />} />
//             </Routes>
//           ) }
            
            
          
//         </div>
//       </Router>
//     </Provider>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { DashboardPage, HomePage, RegisterPage, LoginPage } from "./containers";
import { store } from "./store";

const ProtectedRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? element : <Navigate to="/LoginPage" />;
};

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

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return isAuthenticated ? children : <Navigate to="/LoginPage" />;
};

export default App;
