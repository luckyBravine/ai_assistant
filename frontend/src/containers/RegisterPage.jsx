import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRegisterMutation } from "../features/userAPI";
import { toast } from "sonner";
import { registerUser, setError } from "../features/user";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const { registered } = useSelector((state) => state.user);

  //get the userAPI content so as to get the details within
  const apiState = useSelector((state) => state.userApi);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData;

  useEffect(() => {
    //this is checks whether the mutations has any messages, then it loops over the mutations to check the messages available
    const mutationKeys = Object.keys(apiState.mutations);
    mutationKeys.forEach((key) => {
      const mutation = apiState.mutations[key];
      if (key === "register") {
        if (mutation.status === "rejected" && mutation.error) {
          const errorMessages = mutation.error.data.non_field_errors || [
            "An error occurred",
          ];
          errorMessages.forEach((msg) => toast.error(msg));
        } else if (mutation.status === "fulfilled" && mutation.data) {
          toast.success("User registered successfully!");
        }
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
    e.preventDefault();  //prevents the submission of empty field
    //
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      try {
        const user = await register({ username, email, password }).unwrap();
        dispatch(registerUser(user));
      } catch (error) {
        dispatch(setError(error.data.errorMessage));
      }
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if (registered) return <Navigate to="/LoginPage" />;

  return (
    <Layout title="AI Assistant | Register" content="Register">
      <div className="d-flex justify-content-center align-items-center w-100 container">
        
        <div
          className="card card-body mt-5"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <h2 className="text-center">Register</h2>
          <form onSubmit={onSubmit}>
            <div className="form-group  my-2">
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
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={onChange}
                value={email}
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
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={onChange}
                value={password2}
              />
            </div>
            <div className="form-group my-2">
              {isLoading ? (
                // displays a spinner
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
              Already have an account? <Link to="/LoginPage">Login</Link>
            </p>
          </form>
        </div>
        
      
      </div>
    </Layout>
  );
};

export default RegisterPage;
