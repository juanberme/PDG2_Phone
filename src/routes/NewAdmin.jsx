import React, {useState} from 'react';

import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';

import '../styles/newAdminPage.css';
import 'primeicons/primeicons.css';
import tinkaLogo from '../gallery/tinkaBeyond-logo_DEF.png';


export const NewAdmin = () => {

    //Nombre de la empresa
    const [inputCompany, setInputCompany] = useState('');
    const handleCompanyInput = (e) => {
        setInputCompany(e.target.value);
    }

    //email
    const [inputEmail, setInputEmail] = useState('');
    const handleEmailInput = (e) => {
    setInputEmail(e.target.value);
    }

    //Contraseña
    const [inputPassword, setInputPassword] = useState('');
    const handlePasswordInput = (e) => {
        setInputPassword(e.target.value);
    }

    //Confirmar contraseña
    const [inputConfirmPassword, setInputConfirmPassword] = useState('');
    const handleConfirmPasswordInput = (e) => {
        setInputConfirmPassword(e.target.value);
    }

    //Código de activación
    const [inputActivationCode, setInputActivationCode] = useState('');
    const handleActivationCodeInput = (e) => {
        setInputActivationCode(e.target.value);
    }

    /*
    //Title
    const [inputNew, setInputNew] = useState('');
    const handleNewInput = (e) => {
        setInputNew(e.target.value);
    }
    */
    
  return (
    <section className='companyRegister_CONT'>

    <section className="CR-Top">
        <div className="CR-Top_img">
            <img src={tinkaLogo} alt="Thinka Beyond"/>
        </div>
        <div className="CR-Top_title">
            <h1>Registro</h1>
        </div>
        </section>




        <main className="CR-Main">
            <div className="CR-Main_cont">
                <label htmlFor='company' className='cr-main-label'>Nombre de la empresa</label>
                <span>
                    <InputText className='p-inputtext' value={inputCompany} onChange={handleCompanyInput}/>
                </span>
            </div>

            <div className="CR-Main_cont">
                <label htmlFor='email' className='cr-main-label'>Correo electrónico</label>
                <span>
                    <InputText className='p-inputtext' value={inputEmail} onChange={handleEmailInput}/>
                </span>
            </div>

            <div className="CR-Main_cont">
                <label htmlFor='password' className='cr-main-label'>Contraseña</label>
                <span>
                    <Password className='p-password-input' value={inputPassword} onChange={handlePasswordInput} feedback={false} toggleMask id='cl-fullWidth'/>
                </span>
            </div>

            <div className="CR-Main_cont">
                <label htmlFor='password' className='cr-main-label'>Confirmar contraseña</label>
                <span>
                    <Password className='p-password-input' value={inputConfirmPassword} onChange={handleConfirmPasswordInput} feedback={false} toggleMask id='cl-fullWidth'/>
                </span>
            </div>

            <div className="CR-Main_cont">
                <label htmlFor='password' className='cr-main-label'>Código de activación</label>
                <span>
                    <InputMask id='activationCode' name='Activation-Code' value={inputActivationCode} onChange={handleActivationCodeInput} mask='999-999' placeholder='999-999' />
                </span>
            </div>

            <div className="CR-Main_cont">
                <span>
                    <Button label='Crear un usuario'className='p-button'/>
                </span>
            </div>
        </main>
    </section>
  )
}