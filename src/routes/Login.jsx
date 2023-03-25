import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Btn } from '../components/Btn.js';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';
import '../styles/loginPage.css';

export default function Login(){

    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/tags");
      }

    return <div className='login'>
        <h1 className='loginTitle'>Necesitamos saber quién eres</h1>
        <div className='content'>
            <div className='input'>
                <label className='labelName' htmlFor="name">Nombre</label>
                <InputText className='inputName' id="name" aria-describedby="name-help" />
            </div>

            <div className='input'>
                <label className='labelName' htmlFor="gender">Genero</label>
                <InputText className='inputName' id="gender" aria-describedby="gender-help" />
            </div>

            <div className='input'>
                <label>Fecha de nacimiento</label>
                <div className='calendarContainer'>
                    <div className="placeInput">
                        <InputText placeholder="Día" />
                    </div> 
                    <div className="placeInput">
                        <InputText placeholder="Mes" />
                    </div> 
                    <div className="placeInput">
                        <InputText placeholder="Año" />
                    </div>
                </div>
            </div>
        </div>
        

        

        

        <Button onClick={handleClick} label="Ingresar"/>
    </div>
}