import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/user";
import { toast } from "sonner";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { registered, loading, sucessMessage, errorMessage } = useSelector(
    (state) => state.user
  );
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData;

  useEffect(() => {
    if (sucessMessage) {
      toast.success(sucessMessage);
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [sucessMessage, errorMessage]);

  // useEffect(() => {
  //   // Reset the registered state when the component unmounts
  //   return () => {
  //     dispatch(resetRegistered());
  //   };
  // }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      dispatch(register({ username, email, password }));
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // if (registered) return <Navigate to="/LoginPage" />;
  if (registered) return <Navigate to="/LoginPage" />;
  

  return (
    <Layout title="AI Assistant | Register" content="Register">
      <div className=" m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={onChange}
                value={password2}
              />
            </div>
            <div className="form-group">
              {loading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              )}
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
