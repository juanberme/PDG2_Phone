import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Btn } from '../components/Btn.js';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';
import '../styles/loginPage.css';
import React, { useState } from 'react';

export default function Login(){

    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/tags");
    }

    //name input
    const [inputName, setInputName] = useState('');
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
    const handleDateInput = (e) => {
        setInputDate(e.value);
    }

    
    return <div className='login'>
        <h1 className='loginTitle'>Necesitamos saber quién eres</h1>
        <div className='content'>
            <div className='input'>
                <label className='labelName' htmlFor="name">Nombre</label>
                <InputText className='inputName' id="name" aria-describedby="name-help" value={inputName} onChange={handleNameInput}/>
            </div>

            <div className='input'>
                <label className='labelName' htmlFor="gender">Genero</label>
                <MultiSelect value={inputGender} id="gender" onChange={handleGenderInput} options={allGenders} optionLabel="gender" 
                placeholder="Selecciona tu genere" selectionLimit={1} maxSelectedLabels={1} multiple={false} className="w-full md:w-20rem" />
            </div>

            <div className='input'>
                <label>Fecha de nacimiento</label>
                <Calendar value={inputDate} onChange={handleDateInput} dateFormat="dd/mm/yy" showIcon />
            </div>
        </div>
        
        <Button onClick={console.log(inputName, inputGender, inputDate)} label="Ingresar"/>
    </div>
}

//(e) => {handleClick(); handleNameInput(e); handleGenderInput(e); handleDateInput(e); console.log(handleNameInput, handleGenderInput, handleDateInput)}
