import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import {loadUser} from '../../actions/AuthActions'
import {Showcase} from './Showcase'
 const Homepage = ({auth,loadUser}) => {
   
   
    useEffect(() => {
      loadUser()
   },[])

  


   if(!auth.isAuthenticated){
    
    return <Showcase/>
   }

   if(!auth.user){
       return <h3>Loading...</h3>
   }
   
   
    return (
        <div>
            <h1 className='name center'>{auth.user.name}</h1>
        </div>
    )
}

const mapStateToProp = (state)=>{
    return{
        auth:state.auth
}}
export default connect(mapStateToProp,{loadUser})(Homepage)