import { connect } from "react-redux";
import { logout } from '../../../redux/actions/auth';
import {  Fragment, useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = ({user, isAuthenticated, logout}) => {
  const [redirect, setRedirect] = useState(false);
  const logoutHandler = () => {
    logout();
    setRedirect(true);
  };

  const authLinks = (
      <div>
        {user ? (
          <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li>
                  <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                  </a>
                  </li>
                  <li><a>Settings</a></li>
                  <li><a onClick={logoutHandler}>Logout</a></li>
              </ul>
          </div>
        ):(
          <div>
              no hay user
          </div>
        )}
      </div>

    );

  const resList = (
      <Fragment>
        <div className="flex"> 
          <div className="">
            <Link to={'/signup'}>
              <a className="btn">Signup</a>
            </Link>
          </div>
          <div className="">
            <Link to={'/login'}>
              <a className="btn">Login</a>
            </Link>
          </div>
        </div>
      </Fragment>
    );


  return (
      <div className="navbar bg-base-100">
          
        <div className="flex-none gap-2">
          <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <div>
              {isAuthenticated ? (
                  <div>
                      {authLinks}
                  </div>
              ):(
                  <div>
                      {resList}
                  </div>                        
              )}
        </div>    
    
      </div>
    
    </div>
    
  )
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
});

export default connect(mapStateToProps, {
  logout
})(Navbar)