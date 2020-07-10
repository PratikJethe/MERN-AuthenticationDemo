import{REGISTER_FAIL,REGISTER_SUCCESS,SET_ALERT,REMOVE_ALERT, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOAD_USER_FAIL, LOAD_USER_SUCCESS} from '../actions/actionTypes'


const initialState = {
    isAuthenticated:null,
    loading:true,
    user:null,
}

export const auth = (state=initialState,action)=>{
    const {type,payload} = action
    switch(type){
        case REGISTER_SUCCESS: 
        case LOGIN_SUCCESS:
        return{
            ...state,
            ...payload,
            isAuthenticated:true,
            loading:false
        }
        case LOAD_USER_SUCCESS: return{
            ...state,
            user:payload,
            isAuthenticated:true,
            loading:false
        }

       case REGISTER_FAIL:
       case LOGIN_FAIL: 
       case LOGOUT:
       case LOAD_USER_FAIL: 
       
       return {
           ...state,
           isAuthenticated:false,
           loading:false
       } 
       default: return state 
    }

}
