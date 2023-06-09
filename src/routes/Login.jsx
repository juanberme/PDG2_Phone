import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { db } from '../utils/firebase.js';
import { addDoc, collection } from 'firebase/firestore';

import '../styles/loginPage.css';

export default function Login(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();


    //NAME INPUT
    const [inputName, setInputName] = useState('');
    const [validName, setValidName] = useState(null);

    const validateName = () => {
        const regex = /^(?!\s*$).+/;
        setValidName(regex.test(inputName));
    }

    const handleNameInput = (e) =>{
        setInputName(e.target.value);
        unluckButton();
    }

    //GENDER INPUT
    const [inputGender, setInputGender] =useState('');
    const [validGender, setValidGender] = useState(null);
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

    const validateGender = () => {
        const regex = /^(?!\s*$).+/;
        setValidGender(regex.test(inputGender));
    }

    const handleGenderInput = (e) =>{
        setInputGender(e.value);
        unluckButton();
    }

    //DATE INPUT
    const [inputDate, setInputDate] = useState('');
    const [validDate, setValidDate] = useState(null);

    const validateDate = () => {
        const regex = /^\d+$/;
        setValidDate(regex.test(inputDate));
    }
    const handleDateInput = (e) => {
        setInputDate(e.value);
        unluckButton();
    }

    //EMAIL INPUT
    const [inputEmail, setinputEmail] = useState('');
    const [validEmail, setValidEmail] = useState(null);

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidEmail(regex.test(inputEmail));
    };

    const handleEmailInput = (e) => {
        setinputEmail(e.target.value);
        unluckButton();
    };

    //send data
    const handleLogin = async () => {
        try {
            const col = collection(db, 'users');
            
            if(validEmail && validDate && validName && validGender){
                const doc = await addDoc(col, {
                    name: inputName,
                    gender: inputGender,
                    date: inputDate,
                    email: inputEmail
                });
                
                navigate(`/rules?id=${doc.id}`);
                //console.log(`User ${doc.id} stored in db`);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    //Block Button
    function unluckButton(){
        //console.log(validName);
        //console.log(validEmail);
        //console.log(validGender);
        //console.log(validDate);
        setTimeout(checkValids, 100);
    }

    function checkValids(){
        if(validDate && validEmail && validGender && validName){
            //console.log("Todos validos");
            handleLogin();
        } else {
            //console.log("Falta por lo menos 1");
        }
    }
    

    //Dialog Config
    const [visible, setVisible] = useState(false);
    
    return <div className='login'>
        <section className='text'>
            <h1 className='text_Ttl'>Me gustaría</h1>
            <h2 className='text_Txt'>conocerte</h2>
            <h2 className='text_Txt'>mejor, ¿sí?</h2>
        </section>

        <section className='content'>
            <div className='input'>
                <label className='labelName' htmlFor="name">¿Cómo te llamas?</label>
                <InputText id="login_name" aria-describedby="name-help" value={inputName} onChange={handleNameInput} onBlur={validateName} className={!validName ? 'p-invalid' : ''} placeholder='Nombre'/>
            </div>

            <div className='input'>
                <label className='labelName'>¿Cuál es tu correo?</label>
                <InputText id='login_email' value={inputEmail} onChange={handleEmailInput} onBlur={validateEmail} className={!validEmail ? 'p-invalid' : ''} placeholder='Correo electrónico'/>
            </div>

            <div className='input'>
                <label className='labelName' htmlFor="gender">¿Cuál es tu género?</label>
                    <Dropdown value={inputGender} id="login_gender" onChange={handleGenderInput} onBlur={validateGender} options={allGenders} optionLabel="gender" 
                placeholder="Opciones" className={!validGender? 'p-invalid' : ''}/>
            </div>

            <div className='input'>
                <label className='labelName'>¿Cuántos años tienes?</label>
                <InputNumber inputId='login_calendar' value={inputDate} onChange={handleDateInput} onBlur={validateDate} className={!validDate ? 'p-invalid' : ''} min={0} max={100}/>
            </div>

            <div className="extraInfo">
                <Button id='btnExtraInfo' label='¿Para qué te pedimos esto?' onClick={() => setVisible(true)} link/>
                <Dialog header="Terminos y Condiciones" visible={visible} maximizable style={{width: '85vw'}} onHide={() => setVisible(false)}>
                    <p className='Dlg_Prg'>
                        <strong>Actualizado el 2023-03-20</strong>
                    </p>

                    <p className="Dlg_Prg">
                        <strong>Términos generales</strong>
                        <p>
                            Al acceder y realizar un pedido con PDG-BB, usted confirma que está de acuerdo y sujeto a los términos de servicio contenidos en los Términos y condiciones que se describen a continuación. Estos términos se aplican a todo el sitio web y a cualquier correo electrónico u otro tipo de comunicación entre usted y PDG-BB. 
                            Bajo ninguna circunstancia el equipo de PDG-BB será responsable de ningún daño directo, indirecto, especial, incidental o consecuente, que incluye, entre otros, la pérdida de datos o ganancias que surjan del uso o la incapacidad de usar, los materiales de este sitio, incluso si el equipo de PDG-BB o un representante autorizado han sido informados de la posibilidad de tales daños. Si su uso de materiales de este sitio resulta en la necesidad de servicio, reparación o corrección de equipos o datos, usted asume los costos de los mismos. 
                            PDG-BB no será responsable de ningún resultado que pueda ocurrir durante el curso del uso de nuestros recursos. Nos reservamos el derecho de cambiar los precios y revisar la política de uso de recursos en cualquier momento. 
                        </p>
                    </p>

                    <p className="Dlg_Prg">
                        <strong>Licencia</strong>
                        <p>
                            PDG-BB le otorga una licencia revocable, no exclusiva, intransferible y limitada para descargar, instalar y usar la plataforma estrictamente de acuerdo con los términos de este Acuerdo. 
                            Estos Términos y condiciones son un contrato entre usted y PDG-BB (referidos en estos Términos y condiciones como "PDG-BB", "nosotros", o "nuestro"), el proveedor del sitio web de PDG-BB y los servicios accesibles desde el sitio web de PDG-BB (que se denominan colectivamente en estos Términos y condiciones como el "Servicio de PDG-BB"). 
                            Usted acepta estar sujeto a estos Términos y condiciones. Si no está de acuerdo con estos Términos y condiciones, no utilice el Servicio PDG-BB. En estos Términos y condiciones, "usted" se refiere tanto a usted como individuo como a la entidad que representa. Si viola cualquiera de estos Términos y condiciones, nos reservamos el derecho de cancelar su cuenta o bloquear el acceso a su cuenta sin previo aviso.  
                        </p>
                    </p>

                    <p className="Dlg_Prg">
                        <strong>Definiciones y términos clave</strong>
                        <p>
                            Para ayudar a explicar las cosas de la manera más clara posible en estos Términos y Condiciones, cada vez que se hace referencia a cualquiera de estos términos, se definen estrictamente como:
                            Voy a dejarlo hasta aqui por ahora...
                        </p>
                    </p>
                </Dialog>
            </div>
        </section>

        <Button id='btn_ing' onClick={unluckButton} href={`/tags2?id=${searchParams.get('id')}`} label="Ingresar"/>
    </div>
}
