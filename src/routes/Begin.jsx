import { Button } from 'primereact/button';
import { PDGButton } from '../components/PDGButton.js';

import '../styles/beginPage.css';

export default function Begin(){
    return <div className='fullCont'>
        <div className='fullCont_Txt'>
                <div className="fullCont_Tlt">
                    <h1>¿Te conozco?</h1>
                </div>
                <div className="fullCont_Ln" id='ln1'>
                    <h2>¿Nos hemos </h2>
                    <h2>visto antes?</h2>
                </div>
            </div>

            <div className='fullCont_Txt'>
            <div className="fullCont_Tlt">
                <h1>Bienvenido,</h1>
            </div>
            <div className="fullCont_Ln" id='ln2'>
                <h3>te invito a que juntos</h3>
                <h2>experimentemos</h2>
                <h3>esta nueva forma</h3>
                <h2>de conocernos</h2>
            </div>
                
            </div>
            
            <div className='fullCont_Txt'>
                <div className="fullCont_Tlt">
                    <h1>Toca aquí</h1>
                    <h1>para continuar</h1>
                </div>
            </div>
        <div className='fullCont_Btn'>
            <PDGButton/>
        </div>
    </div>
}