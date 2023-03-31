import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { AnchorButton } from '../components/Btn.js';
import '../styles/loginPage.css';
import React, { useState } from 'react';
import { db } from '../utils/firebase.js';
import { addDoc, collection, doc } from 'firebase/firestore';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';

export default function Login(){
    const navigate = useNavigate();
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

    //send data
    const handleLogin = async () => {
        try {
            const col = collection(db, 'users');
            const doc = await addDoc(col, {
                name: inputName,
                gender: inputGender,
                date: inputDate
            });
            
            navigate(`/tags?id=${doc.id}`);
            console.log(`User ${doc.id} stored in db`);
        } catch (error) {
            console.error(error.message);
        }
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
        
        <Button onClick={handleLogin} label="Ingresar"/>
    </div>
}

//(e) => {handleClick(); handleNameInput(e); handleGenderInput(e); handleDateInput(e); console.log(handleNameInput, handleGenderInput, handleDateInput)}
