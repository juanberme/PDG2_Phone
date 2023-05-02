import React, {useState} from 'react';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export const Admin = () => {
  //email
  const [inputCompany, setInputCompany] = useState('');
  const handleCompanyInput = (e) => {
    setInputCompany(e.target.value);
  }
  
  //password
  const [inputPassword, setInputPassword] = useState('');
  const handlePasswordInput = (e) =>{
    setInputPassword(e.target.value);
  }

  return (
    <div>
      <div>
        <label htmlFor='username'>Nombre </label>
        <InputText value={inputCompany} onChange={handleCompanyInput}/>
      </div>
      <div>
        <label htmlFor='password'>Contraseña</label>
        <Password id='password' value={inputPassword} onChange={handlePasswordInput} feedback={false} toggleMask/>
      </div>
      <Button label="Ingresar"/>
    </div>
  )
}
