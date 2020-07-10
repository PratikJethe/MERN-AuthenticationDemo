import React,{useState} from "react";
import {register} from '../../actions/AuthActions'
import {connect} from 'react-redux'
import Alert from './Alert'
import { Redirect } from "react-router-dom";

const Register = ({isAuthenticated,register}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

const onsubmit = (e)=>{
    e.preventDefault()
    console.log(formData)
    register(name,email,password)
}

if(isAuthenticated){
return <Redirect to ='/'></Redirect>
}

  return (
    <form className="container m-auto mt-5" onSubmit={onsubmit}>
     <Alert></Alert>

      <div className="form-group ">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter email"
          onChange={onChange}
          name="name"
          value={name}
        />
        <small id="emailHelp" className="form-text text-muted">
          Name
        </small>
      </div>
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
        Submit
      </button>
    </form>
  );
};
const mapStateToProp=(state)=>{
  return{
      isAuthenticated:state.auth.isAuthenticated
  }
}
export default connect(mapStateToProp,{register})(Register);
