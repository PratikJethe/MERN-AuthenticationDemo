import React,{useEffect} from 'react'
import {connect} from 'react-redux'
 const Alert = ({alerts}) => {

// useEffect(()=>{
// if( document.getElementById('rmv')){

//     var opacity = 1.0
//     setTimeout(()=>{
//         opacity = opacity-0.2
//         document.getElementById('rmv').style.opacity=opacity.toString()
//     },500)
//     setTimeout(()=>{
//         opacity = opacity-0.2
//         document.getElementById('rmv').style.opacity=opacity.toString()
//     },1000)
//     setTimeout(()=>{
//         opacity = opacity-0.2
//         document.getElementById('rmv').style.opacity=opacity.toString()
//     },1500)
    
// }     
// })


   if(alerts===null&&alerts.length===0){
    return (
        <div>
            
        </div>
    )
   }
   
   else {
      return  alerts.map((alert)=>{
          return <div key={alert.id} className = {`bg-${alert.alertType} mb-3 text-center`}  id ='rmv'>{alert.msg}</div>
       })
   }

}

const mapStateToProp = (state)=>{

   return {
       alerts:state.alert
   }

}

export default connect(mapStateToProp)(Alert)