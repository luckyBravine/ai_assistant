import Layout from "../components/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import {Navigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {register} from '../features/user'

const RegisterPage = () => {
  const dispatch = useDispatch();
  const {registered, loading} = useSelector(state => state.user)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData;
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      // dispatch(createMessage({ passwordNotMatch: 'Passwords do not match' }));
      console.log("Password did not match")
      dispatch(register)
    } else {
      dispatch(register({username, email, password}))
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if(registered) return <Navigate to='/LoginPage' />

  return (
    <Layout title="AI Assistant | Dashboard" content="Dashboard">
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
