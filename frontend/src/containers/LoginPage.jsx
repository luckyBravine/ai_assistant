import Layout from "../components/Layout";
import { resetRegistered, setUser, setError } from "../features/user";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../features/userAPI";
import { toast } from "sonner";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [login, { isLoading, isAuthenticated, registered }] = useLoginMutation();
  const [redirect, setRedirect] = useState(false);

  const apiState = useSelector((state) => state.userApi);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  useEffect(() => {
    if (registered) {
      dispatch(resetRegistered());
    }
  }, [registered, dispatch]);
  
  useEffect(() => {
    const mutationKeys = Object.keys(apiState.mutations);
    mutationKeys.forEach((key) => {
      const mutation = apiState.mutations[key];
      if (mutation.status === "rejected" && mutation.error) {
        const errorMessages = mutation.error.data.non_field_errors || [
          "An error occurred",
        ];
        errorMessages.forEach((msg) => toast.error(msg));
      } else if (mutation.status === "fulfilled" && mutation.data) {
        toast.success("Login successful!");
        // Delay redirect to ensure toast is shown
        setTimeout(() => setRedirect(true), 1000);
      }
    });

    const queryKeys = Object.keys(apiState.queries);
    queryKeys.forEach((key) => {
      const query = apiState.queries[key];
      if (query.status === "rejected" && query.error) {
        const errorMessages = query.error.data.non_field_errors || [
          "An error occurred",
        ];
        errorMessages.forEach((msg) => toast.error(msg));
      } else if (query.status === "fulfilled" && query.data) {
        toast.success("Request successful!");
      }
    });
  }, [apiState.mutations, apiState.queries]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password }).unwrap();
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error.data.errorMessage));
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (redirect || isAuthenticated) return <Navigate to="/DashboardPage" />;

  return (
    <Layout title="AI Assistant | Login" content="Login">
      <div className="d-flex justify-content-center align-items-center w-100 container">
        <div
          className="card card-body mt-5"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <h2 className="text-center">Login</h2>
          <form onSubmit={onSubmit}>
            <div className="form-group my-2">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={onChange}
                value={username}
              />
            </div>
            <div className="form-group my-2">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={onChange}
                value={password}
              />
            </div>
            <div className="form-group my-2">
              {isLoading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              )}
            </div>
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/RegisterPage">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;

