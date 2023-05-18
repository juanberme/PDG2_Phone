import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';
        
import { AnchorButton } from '../components/Btn.js';

import React, { useState } from 'react';
import { db } from '../utils/firebase.js';
import { addDoc, collection, doc } from 'firebase/firestore';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';

import '../styles/loginPage.css';

export default function Login(){
    const navigate = useNavigate();
    //name input
    const [inputName, setInputName] = useState('');
    const [validName, setValidName] = useState(true);

    const validateName = () => {
        const regex = /^(?!\s*$).+/;
        setValidName(regex.test(inputName));
    }

    const handleNameInput = (e) =>{
        setInputName(e.target.value);
    }


    //gender input
    const [inputGender, setInputGender] =useState('');
    const allGenders = [
        {
            gender: 'Hombre', value: 'Male'
        },
        {
            gender: 'Mujer', value: 'Female'
        },{
            gender: 'Prefiero no decirlo', value: 'Prefer not to say'
        }
    ];

    const handleGenderInput = (e) =>{
        setInputGender(e.value);
    }

    //date input
    const [inputDate, setInputDate] = useState('');
    const [validDate, setValidDate] = useState(true);

    const validateDate = () => {
        const regex = /^(?!\s*$).+/;
        setValidDate(regex.test(inputDate));
    }
    const handleDateInput = (e) => {
        setInputDate(e.value);
    }

    //email input
    const [email, setEmail] = useState('');
    const [valid, setValid] = useState(true);

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValid(regex.test(email));
    };

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    };

    //send data
    const handleLogin = async () => {
        try {
            const col = collection(db, 'users');
            
            
            if(valid && validDate && validName){
                const doc = await addDoc(col, {
                    name: inputName,
                    gender: inputGender,
                    date: inputDate,
                    email: email
                });
                
                navigate(`/tags?id=${doc.id}`);
                console.log(`User ${doc.id} stored in db`);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    
    //<Calendar id='login_calendar' value={inputDate} onChange={handleDateInput} dateFormat="dd/mm/yy" showIcon />
    return <div className='login'>
        <section className='text'>
            <div className="text_up">
                <h1 className='text_Ttl'>Ayúdame a</h1>
                <h2 className='text_Txt'>conocerte</h2>
                <h2 className='text_Txt'>mejor, ¿sí?</h2>
            </div>
            <div className="text_down">
                <h3 className='text_Ln'>Puedes usar un correo o contraseña</h3>
            </div>
        </section>

        <section className='content'>
            <div className='input'>
                <label className='labelName' htmlFor="name">Nombre</label>
                <span className="INPT_Name">
                    <InputText id="login_name" aria-describedby="name-help" value={inputName} onChange={handleNameInput} onBlur={validateName}/>
                    {!validName && <small className="p-error">Ingresa tu Nombre</small>}
                </span>
            </div>

            <div className='input'>
                <label className='labelName'>Correo electrónico</label>
                <InputText id='login_email' value={email} onChange={handleEmailInput} onBlur={validateEmail} className={!valid ? 'p-invalid' : ''}/>
                {!valid && <small className="p-error">Ingresa un correo electrónico válido.</small>}
            </div>

            <div className='input'>
                <label className='labelName' htmlFor="gender">Genero</label>
                <MultiSelect value={inputGender} id="login_gender" onChange={handleGenderInput} options={allGenders} optionLabel="gender" 
                placeholder="Selecciona tu genere" selectionLimit={1} maxSelectedLabels={1} multiple={false} className="w-full md:w-20rem" />
            </div>

            <div className='input'>
                <label className='labelName'>Edad</label>
                <InputNumber inputId='login_calendar' value={inputDate} onChange={handleDateInput} onBlur={validateDate} min={0} max={100}/>
                {!validDate && <small className="p-error">Ingresa tu edad.</small>}
            </div>
        </section>
        
        <Button id='btn_ing' onClick={handleLogin} label="Ingresar"/>
    </div>
}

//(e) => {handleClick(); handleNameInput(e); handleGenderInput(e); handleDateInput(e); console.log(handleNameInput, handleGenderInput, handleDateInput)}
