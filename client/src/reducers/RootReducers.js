
import {combineReducers} from 'redux';
import alert from './AlertReducers'
import {auth} from './AuthReducers'
import {LOGOUT} from '../actions/actionTypes'
// export default combineReducers({
//     alert:alert,
//     auth:auth
// })


const appReducer = combineReducers({
    /* your app’s top-level reducers */
    alert:alert,
    auth:auth

  })
  
  const rootReducer = (state, action) => {
    if (action.type === LOGOUT){
        console.log('logged out')
       state = undefined
      }
  
    return appReducer(state, action)
  }

  export default rootReducer