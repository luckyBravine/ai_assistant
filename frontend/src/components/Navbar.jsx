import { NavLink, Link } from "react-router-dom";
// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/userAPI";
import { clearUser } from "../features/user";
// import { BiTime } from "react-icons/bi";
// import { CgMenuLeftAlt } from "react-icons/cg";

const Navbar = () => {
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const { isAuthenticated } = useSelector((state) => state.user);
  // const [click, setClick] = useState(false);

  // const handleClick = () => setClick(!click);

  const handleLogout = async () => {
    await logout().unwrap();
    dispatch(clearUser());
  };

  const authLinks = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/DashboardPage">
          Dashboard
        </NavLink>
      </li>
      <li className="nav-item">
        {isLoading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button className="btn-warning btn text-light" onClick={handleLogout}>
            Logout
          </button>
        )}
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/LoginPage">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/RegisterPage">
          Register
        </NavLink>
      </li>
    </>
  );

  // const content = (
  //   <>
  //     <div className="lg:hidden block absolute top-10 w-full left-0 right-0 bg-slate-900 transition">
  //       <ul className="text-center text-xl p-20">
  //         {isAuthenticated ? authLinks : guestLinks}
  //       </ul>
  //     </div>
  //   </>
  // );

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary fixed-top text-center container-fluid">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="#">
          AI Assistant
        </Link>
        <div className="collapse-sm navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
    // <nav className="w-full flex mx-auto justify-between items-center">
    //   <div className="h-10vh flex justify-between top-0 bg-slate-800 z-50 lg:py-5 px-20 py-4">
    //     <div className="flex items-center flex-1">
    //       <span className="text-3xl font-bold">Logo</span>
    //     </div>
    //     <div className="hidden lg:flex lg:flex-1 items-center justify-end font-normal">
    //       <div className="flex-10">
    //         <ul className="flex gap-8 mr-16 text-[16px]">
    //           {isAuthenticated ? authLinks : guestLinks}
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="block lg:hidden">
    //       <button className="transition" onClick={handleClick}>
    //         {click ? <BiTime /> : <CgMenuLeftAlt />}
    //       </button>
    //     </div>
    //   </div>
    //   {click && (
    //     <div className="lg:hidden bg-slate-800 w-full px-20 py-4">
    //       {content}
    //     </div>
    //   )}
    // </nav>
  );
};

export default Navbar;
