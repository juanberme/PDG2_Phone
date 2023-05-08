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
        <div className='newAdmin_DV'>
            <label htmlFor='newUsername'>Nombre de la compañía</label>
            <InputText id='newUsername' value={inputNewUsername} onChange={handleNewUsernameInput}/>
        </div>
        <div className='newAdmin_DV'>
            <label htmlFor='email'>Correo</label>
            <InputText id='email'value={inputEmail} onChange={handleEmailInput}/>
        </div>
        <div className='newAdmin_DV'>
            <label htmlFor='newPassword'>Constraseña</label>
            <Password id='newPassword' value={inputNewPassword} onChange={handleNewPasswordInput} toggleMask/>
        </div>

        <div className='newAdmin_DV'>
            <label htmlFor='passwordConfirm'>Confirmar contraseña</label>
            <InputText id='passwordConfirm' value={inputPasswordConfirm} onChange={handlePasswordConfirmInput} feedback={false}/>
        </div>

        <Button className='btn_CTA' label="Registrarme"/>
    </section>
  )
}
