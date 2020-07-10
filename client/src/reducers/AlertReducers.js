import {REMOVE_ALERT,SET_ALERT} from '../actions/actionTypes'


const initialState = []


const alert = (state=initialState,action)=>{
   const {type,payload} = action

    switch(type){

        case SET_ALERT: return [...state,payload];
        case REMOVE_ALERT: return state.filter(alert=>alert.id !== payload.id)
     default: return state
      

   }
}

export default alert