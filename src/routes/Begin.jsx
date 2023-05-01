import { Button } from 'primereact/button';
import { PDGButton } from '../components/PDGButton.js';

import '../styles/beginPage.css';
import '../styles/mediaQBegin.css';

export default function Begin(){
    return <section className='fullCont'>
        <div className='fullCont_Txt'>
                <div className="fullCont_Tlt">
                    <h1 id='Tlt_h'>¿Te conozco?</h1>
                </div>
                <div className="fullCont_Ln" id='ln1'>
                    <h2 id='Ln_h'>¿Nos hemos </h2>
                    <h2 id='Ln_h'>visto antes?</h2>
                </div>
            </div>

            <div className='fullCont_Txt'>
            <div className="fullCont_Tlt">
                <h1 id='Tlt_h'>Bienvenido,</h1>
            </div>
            <div className="fullCont_Ln" id='ln2'>
                <h3 id='Ln_h'>te invito a que juntos</h3>
                <h2 id='Ln_h'>experimentemos</h2>
                <h3 id='Ln_h'>esta nueva forma</h3>
                <h2 id='Ln_h'>de conocernos</h2>
            </div>
                
            </div>
            
            <div className='fullCont_Txt' id='fullCont_Txt_L'>
                <div className="fullCont_Tlt">
                    <h1 id='Tlt_h'>Toca aquí</h1>
                    <h1 id='Tlt_h'>para continuar</h1>
                </div>
            </div>
        <div className='fullCont_Btn'>
            <PDGButton/>
        </div>
    </section>
}