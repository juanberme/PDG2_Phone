import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

export const PDGButton = () => {
  
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate("/login");
  }
  
  return (
      <div className='Btn_icon'>
        <Button id='btn_begin' onClick={handleClick} icon="pi pi-angle-right" size='large' rounded/>
      </div>
  )
}
