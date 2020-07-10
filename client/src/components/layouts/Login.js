import React,{useState} from "react";
import {login} from '../../actions/AuthActions'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import Alert from './Alert'

const Login = ({isAuthenticated,login}) => {



  const [formData, setFormData] = useState({
 
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

const onsubmit = (e)=>{
    e.preventDefault()
    console.log(formData)
   login(email,password)
}

if(isAuthenticated){
    return <Redirect to='/'></Redirect>
}

  return (
    <form className="container  mt-5" onSubmit={onsubmit}>
     <Alert></Alert>

      <div className="form-group ">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Enter email"
          onChange={onChange}
          value={email}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label >Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          name="password"
          onChange={onChange}
          value={password}
        />
      </div>

      <button onClick={onsubmit} type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};
const mapStateToProp=(state)=>{
    return{
        isAuthenticated:state.auth.isAuthenticated
    }
}
export default connect(mapStateToProp,{login})(Login);
