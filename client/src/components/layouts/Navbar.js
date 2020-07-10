import React from 'react'
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {logout} from '../../actions/AuthActions'
 const Navbar = ({logout,isAuthenticated}) => {
    
  if(isAuthenticated){
    return (
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand " href="/">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto">
          <Link to='' onClick={logout} className="nav-item nav-link btn  purple accent-2 text-white" >Logout</Link>
          
        </div>
      </div>
    </nav>
      </div>
    )
  }
  
  
  
  return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand " href="/">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <Link to='/Login' className="nav-item nav-link btn text-white" >Login</Link>
            <Link to="/Register" className="nav-item nav-link btn text-white" >Register</Link>
            
          </div>
        </div>
      </nav>
        </div>
    )
}

const mapStateToProp=(state)=>{
return {
  isAuthenticated:state.auth.isAuthenticated
}
}

export default connect(mapStateToProp,{logout})(Navbar)
