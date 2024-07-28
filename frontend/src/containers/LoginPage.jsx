import Layout from '../components/Layout'
import { resetRegistered, login } from '../features/user'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "sonner";

const LoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetRegistered())
  }, [])
  const { loading, sucessMessage, errorMessage } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password, } = formData;

  useEffect(() => {
    if (sucessMessage) {
      toast.success(sucessMessage);
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [sucessMessage, errorMessage]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login({username, password}))
    
    
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Layout title='AI Assistant | Login' content='Login'>
      <div className=" m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
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
              {loading ? (
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
              Already have an account? <Link to="/registerPage">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default LoginPage