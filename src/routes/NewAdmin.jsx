import React, {useState} from 'react';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import '../styles/newAdminPage.css';

export const NewAdmin = () => {
    const [inputNewUsername, setInputNewUsername] = useState('');
    const handleNewUsernameInput = (e) => {
        setInputNewUsername(e.target.value);
    }

    const [inputEmail, setInputEmail] = useState('');
    const handleEmailInput = (e) => {
        setInputEmail(e.target.value);
    }

    const [inputNewPassword, setInputNewPassword] = useState('');
    const handleNewPasswordInput = (e) => {
        setInputNewPassword(e.target.value);
    }

    const [inputPasswordConfirm, setInputPasswordConfirm] = useState('');
    const handlePasswordConfirmInput = (e) => {
        setInputPasswordConfirm(e.target.value);
    }
  return (
    <section className='newAdmin_SCT'>
        <section className='SCT_CTA'>
            <div className="newAdmin_Ttl">
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

            <div className="newAdmin_Frm">
                <div className='Frm_Dv'>
                    <label htmlFor='newUsername'>Nombre de la compañía</label>
                    <span className="p-input">
                        <InputText id='newUsername' value={inputNewUsername} onChange={handleNewUsernameInput}/>
                    </span>
                </div>
                <div className='Frm_Dv'>
                    <label htmlFor='email'>Correo</label>
                    <span className="p-input">
                        <InputText id='email'value={inputEmail} onChange={handleEmailInput}/>
                    </span>
                </div>
                <div className='Frm_Dv'>
                    <label htmlFor='newPassword'>Constraseña</label>
                    <span className='p-input'>
                        <Password id='newPassword' value={inputNewPassword} onChange={handleNewPasswordInput} toggleMask promptLabel='Nivel de seguridad' 
                        weakLabel='Muy simple' mediumLabel='Regular' strongLabel='Buena'/>
                    </span>
                </div>
                <div className='Frm_Dv'>
                    <label htmlFor='passwordConfirm'>Confirmar contraseña</label>
                    <span className='p-input'>
                        <Password id='newPassword' value={inputPasswordConfirm} onChange={handlePasswordConfirmInput} toggleMask promptLabel='Nivel de seguridad' 
                        weakLabel='Muy simple' mediumLabel='Regular' strongLabel='Buena'/>
                    </span>
                </div>

                <Button className='btn_CTA' label="Registrarme"/>
            </div>
        </section>
        
        <section className="SCT_DEC">
            <img src="" alt="_ERROR_img-logo.svg"/>
        </section>
    </section>
  )
}
