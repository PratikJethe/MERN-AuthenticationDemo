import {
  REGISTER_FAIL,
  SET_ALERT,
  REMOVE_ALERT,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS
} from "./actionTypes";
import axios from "axios";
import { setAlert } from "./AlertAction";

export const register = (name, email, password) => {
  return async (dispatch) => {
    const body = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post("/api/auth/register", body, {
        headers: headers,
      });
      console.log(res);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
      });

      const errors = error.response.data.errors;
      console.log(error.response.data.errors);
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const body = JSON.stringify({
      email: email,
      password: password,
    });
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post("/api/auth/login", body, {
        headers: headers,
      });
      console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
      });

      const errors = error.response.data.errors;
      console.log(error.response.data.errors);
      errors.forEach((error) => {
        console.log(error)
        dispatch(setAlert(error.msg, "danger"));
      });
    }
  };
};
export const logout = () => {


  return async (dispatch)=>{
    const headers = {
      "Content-Type": "application/json",
    };
  try {
    const res = await axios.get("/api/auth/logout", {
      headers: headers,
    }).then((data)=>{
      return dispatch({
        type:LOGOUT
      })
    })


  } catch (error) {
    console.log(error)
  } 



    
  }
};


export const loadUser = ()=>{

return async (dispatch)=>{
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.get("/api/auth/", {
      headers: headers,
    })

    dispatch({
      type:LOAD_USER_SUCCESS,
      payload:res.data
    })
    
  } catch (error) {
    dispatch({
      type:LOAD_USER_FAIL,
    })
  }


}

}