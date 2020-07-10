import React, { Fragment, useEffect } from "react";
import Navbar from "./components/layouts/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/layouts/Homepage";
import Register from "./components/layouts/Register";
import Login from "./components/layouts/Login";
import {Showcase} from "./components/layouts/Showcase";
import  {connect} from "react-redux";
import {loadUser} from './actions/AuthActions'

function App({ auth,loadUser }) {
  console.log(auth)
  
  useEffect(()=>{
    loadUser()
  },[])
  
  
  
  
  
  
  if (auth.loading) {
    return (<div className='m-auto'><h1>LOADING...</h1></div>)
    
  }
  return (
    <Fragment>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Homepage}></Route>
          <Route exact path="/Register" component={Register}></Route>
          <Route exact path="/Login" component={Login}></Route>
          <Route exact path="/showcase" component={Showcase}></Route>
        </Switch>
      </Router>
    </Fragment>
  );

}
const mapStateToProp = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProp, {loadUser})(App);
