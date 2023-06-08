import React, { useEffect } from 'react'

const Myaccount = () => {
 useEffect=(()=>{
   if(!localStorage.getItem('token')){
     window.location.href='/'
   } 
},[]
 )
    return (
    <div>
      
    </div>
  )

}
export default Myaccount
