import React, {useState} from 'react';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

import '../styles/adminPage.css';
import 'primeicons/primeicons.css';

import tinkaLogo from '../gallery/tinkaBeyond-logo_DEF.png';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router';

export const Admin = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
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

  //remember me
  const [checked, setChecked] = useState(false);
  
  const handleLogin = async () => {
    try {
      await auth.login(inputCompany, inputPassword);
      console.log('SESION INICIADA');
      navigate('/adminStand');
    } catch (error) {
      console.error(error);  
    }
  }

  if (auth.currentUser) {
    let target = '/adminStand';

    //   /admin/final ["", "admin", "final"]
    const route = location.pathname.split('/');

    if (route.length === 3)
      target = `/${route[2]}`;

    return <Navigate to={target}/>;
  }

  return (
    <section className='companyLogin_CONT'>

      <section className="CL-Top">
        <div className="CL-Top_img">
          <img src={tinkaLogo} alt="Thinka Beyond"/>
        </div>
        <div className="CL-Top_title">
          <h1>Ingresa a la plataforma</h1>
        </div>
      </section>




      <main className="CL-Main">
      <div className="CL-Main_cont">
          <label id='cl-main-label'>Nombre de la empresa</label>
          <span>
            <InputText className='p-inputtext' value={inputCompany} onChange={handleCompanyInput}/>
          </span>
        </div>

        <div className="CL-Main_cont">
          <label id='cl-main-label'>Contraseña</label>
          <span>
            <Password className='p-password-input' value={inputPassword} onChange={handlePasswordInput} feedback={false} toggleMask id='cl-fullWidth'/>
          </span>
        </div>

        <div className="CL-Main_cont">
          <div className="CL-Main_underInputs">
            <span id='cl-main-chb'>
              <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox> <strong id='cl-main-chb-txt'>Recordarme</strong>
            </span>
            <span>
              <Button label='¿Olvidaste tu contraseña?' severity="secondary" text/>
            </span>
          </div>
        </div>

        <div className="CL-Main_cont">
          <span>
            <Button label='Ingresar'className='p-button' onClick={handleLogin}/>
          </span>
        </div>
      </main>
    </section>
  )
}