import { Button } from 'primereact/button';
import { PDGButton } from '../components/PDGButton.js';

import '../styles/beginPage.css';
import '../styles/mediaqueriesBegin.css';

export default function Begin(){
    return <div className='fullCont'>
        <section className='fullCont_Ttl'>
            <div className='fullCont_Ln'>
                <h1 id='l1'>¿Te conozco?</h1>
                <h2>¿Nos hemos </h2>
                <h2 id='l2'>visto antes?</h2>
            </div>
            <div className='fullCont_Ln'>
                <h1 id='l3'>Bienvenido,</h1>
                <h3>te invito a que juntos</h3>
                <h2 id='l4'>experimentemos</h2>
                <h3>esta nueva forma</h3>
                <h2 id='l5'>de conocernos</h2>
            </div>
            <div className='fullCont_Ln'>
                <h1>Toca aquí</h1>
                <h1 id='l6'>para continuar</h1>
            </div>
        </section>
        <section className='fullCont_Btn'>
            <PDGButton/>
        </section>
    </div>
}