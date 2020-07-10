import {REMOVE_ALERT,SET_ALERT} from './actionTypes'
import { v4 as uuidv4 } from 'uuid';


export  function setAlert(msg,alertType){
    
    const id = uuidv4()
    return (dispatch)=>{
       dispatch({
           type:SET_ALERT,
           payload:{
               msg,
               alertType,
               id
           }

       })

       setTimeout(()=>{
        dispatch({
            type:REMOVE_ALERT,
            payload:{
                msg,
                alertType,
                id
            }
        })
       },5000)
    }
}