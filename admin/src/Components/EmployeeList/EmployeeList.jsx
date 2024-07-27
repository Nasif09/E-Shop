import React, { useEffect, useState } from 'react';
import './EmployeeList.css'
import cross_icon from '../../assets/cross_icon.png';

const ListEmployee = () => {
  const [allEmployee, setAllEmployee] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/api/employees')
      .then((res) => res.json())
      .then((data) => {
        setAllEmployee(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeEmployee = async (id) => {
    await fetch('http://localhost:4000/removeemployee', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className='list-product'>
      <h1>All Employee List</h1>
      <div className='listproduct-header'>
        <p>Profile</p>
        <p>Name</p>
        <p>Email</p>
        <p>Gender</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        {allEmployee.map((employee, index) => (
          <div key={index}>
            <div className='listproduct-item'>
              <img src={employee.image} alt='' className='listproduct-product-icon' />
              <p>{employee.name}</p>
              <p>{employee.email}</p>
              <p>{employee.gender}</p>
              <img
                onClick={() => removeEmployee(employee.id)}
                className='listproduct-remove-icon'
                src={cross_icon}
                alt=''
              />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListEmployee;
