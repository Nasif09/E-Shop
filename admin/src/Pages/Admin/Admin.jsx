import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import AddUser from '../../Components/AddUser/AddUser'
import ListEmployee from '../../Components/EmployeeList/EmployeeList'
import Dashboard from '../../Components/Dashboard/Dashboard'


const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/admin-dashboard' element={<Dashboard/>}/>

        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>

        <Route path='/listemployee' element={<ListEmployee/>}/>
        <Route path='/addemployee' element={<AddUser/>}/>
      </Routes>
    </div>
  )
}

export default Admin
