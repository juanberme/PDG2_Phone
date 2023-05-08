import React, {useState} from 'react';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import '../styles/adminPage.css';

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
    <section className='admin_SCT'>
      <section className='SCT_CTA'>
        <div className="admin_Ttl">
          <span className="Ttl_h1">
            <h1 id='hs'>Para ingresar debes usar</h1>
          </span>
          <span className="Ttl_h3">
            <h3 id='hs'>el correo y contraseña</h3>
          </span>
          <span className="Ttl_h3">
            <h3 id='hs'>de la empresa</h3>
          </span>
        </div>

        <div className="admin_Frm">
          <div className='frm_Dv'>
            <label htmlFor='username'>Nombre de la empresa</label>
            <span className="p-input">
              <InputText value={inputCompany} onChange={handleCompanyInput}/>
            </span>
          </div>
          <div className='frm_Dv'>
            <label htmlFor='password'>Contraseña</label>
            <span className="p-input">
              <Password value={inputPassword} onChange={handlePasswordInput} feedback={false} toggleMask/>
            </span>
          </div>
          <div className='frm_Dv'>
            <label htmlFor='password'>Código de empresa</label>
            <span className="p-input">
              <Password value={inputPassword} onChange={handlePasswordInput} feedback={false} toggleMask/>
            </span>
          </div>
          <Button className='btn_CTA' label="Ingresar"/>
        </div>
      </section>
      
      <section className="SCT_DEC">
        <img src="" alt="_ERROR_img-logo.svg"/>
      </section>
    </section>
  )
}
