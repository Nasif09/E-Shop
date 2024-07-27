import React, { useEffect, useState } from 'react'
import './Dashboard.css'


const Dashboard = () => {
    const [usercount, setUserCount] = useState({});
  
    const UserCount = async() => {
        await fetch('http://localhost:4000/user-count')
        .then((res)=>res.json())
        .then((data)=> {
            setUserCount(data);
          });
    }
    useEffect(() => {
        UserCount();
      }, [1]);

  return (
    <div className='dashboard'>
      {/* <div className='count-container'onClick={()=>{UserCount()}} >Total Product: {usercount}</div>
      <div className='count-container'onClick={()=>{UserCount()}} >Total Employee: {usercount}</div> */}
      <div className='count-container' >Total User: {usercount}</div>
    </div>
  )
}

export default Dashboard
