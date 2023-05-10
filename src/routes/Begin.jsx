import { Button } from 'primereact/button';
import { PDGButton } from '../components/PDGButton.js';

import '../styles/beginPage.css';

export default function Begin(){
    return <section className='fullCont'>
        <div className='Cont_Txt'>
                <div className="Cont_Tlt">
                    <h1 className='Tlt_h'>¿Te conozco?</h1>
                </div>
                <div className="Cont_Ln" id='ln1'>
                    <h2 className='Ln_h'>¿Nos hemos </h2>
                    <h2 className='Ln_h'>visto antes?</h2>
                </div>
            </div>

            <div className='Cont_Txt'>
            <div className="Cont_Tlt">
                <h1 className='Tlt_h'>Bienvenido,</h1>
            </div>
            <div className="Cont_Ln" id='ln2'>
                <h3 className='Ln_h'>te invito a que juntos</h3>
                <h2 className='Ln_h'>experimentemos</h2>
                <h3 className='Ln_h'>esta nueva forma</h3>
                <h2 className='Ln_h'>de conocernos</h2>
            </div>
                
            </div>
            
            <div className='Cont_Txt'>
                <div className="Cont_Tlt">
                    <h1 className='Tlt_h'>Toca aquí</h1>
                    <h1 className='Tlt_h'>para continuar</h1>
                </div>
            </div>
        <div className='Cont_Btn'>
            <PDGButton/>
        </div>
    </section>
}