import React, { useState } from 'react'
import './AddUser.css'
import upload_area from '../../assets/upload_area.svg'

const AddUser = () => {
    const [image, setImage] = useState(false);
    const [userDetails, setUserDetails] = useState({
        username:"",
        email:"",
        image:"",
        gender:"men",
        password:"",
    })

    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) =>{
        setUserDetails({...userDetails,[e.target.name]:e.target.value});
    }

    const Add_Emp = async() => {
        let responseData;
        let formData = new FormData();
        formData.append('image', image);

        await fetch('http://localhost:4000/api/employees/upload',{
          method:'POST',
          body: formData,
        })
        .then((res)=>res.json())
        .then((data)=>{responseData=data})

        if(responseData.success){
          let user={...userDetails, image: responseData.image_url}
          console.log(user);

          await fetch('http://localhost:4000/api/employees',{
            method:'POST',
            headers:{
              Accept:'application/json',
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user),
          })
          .then((res)=> res.json())
          .then((data)=>{
            data.success ? alert("User Added") : alert("Failed");
          })
        }
    }


  return (
    <div className='add-user'>

      <div className="adduser-itemfield">
        <p>Username</p>
        <input value={userDetails.username} onChange={changeHandler} type="text" name='username' placeholder='joe'/>
      </div>

      <div className="adduser-itemfield">
        <p>Email</p>
        <input value={userDetails.email} onChange={changeHandler} type="text" name='email' placeholder='joe@gmail.com'/>
      </div>

      <div className="adduser-itemfield">
        <p>Password</p>
        <input value={userDetails.password} onChange={changeHandler} type="password" name='password' placeholder='password'/>
      </div>

      <div className="adduser-itemfield">
        <p>Gender</p>
        <select value={userDetails.gender} onChange={changeHandler} name="gender" className='add-user-selector'>
            <option value="women">Women</option>
            <option value="men">men</option>
        </select>
      </div>

      <div className="adduser-itemfield">
        <label htmlFor="file-input">
            <img src={image ? URL.createObjectURL(image) : upload_area} className='adduser-thumnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick={()=>{Add_Emp()}} className='adduser-btn'>ADD</button>
    </div>
  )
}

export default AddUser
