import { Button } from 'primereact/button';
import { PDGButton } from '../components/PDGButton.js';
import '../styles/beginPage.css';
import '../styles/mediaqueries.css';

export default function Begin(){
    return <div className='fullCont'>
        <section className='fullCont_Ttl'>
            <h1 className='fullCont_Ln' id='l1'>¿Te conozco?</h1>
            <h1 className='fullCont_Ln' id='l2'>¿Nos hemos </h1>
            <h1 className="fullCont_Ln" id='l3'>visto antes?</h1>
            <h1 className="fullCont_Ln" id='l4'>Bienvenido,</h1>
            <h1 className="fullCont_Ln" id="l5">te invito a que juntos</h1>
            <h1 className="fullCont_Ln" id="l6">experimentemos</h1>
            <h1 className="fullCont_Ln" id="l7">esta nueva forma</h1>
            <h1 className="fullCont_Ln" id="l8">de conocernos</h1>
            <h1 className="fullCont_Ln" id="l9">Toca aquí</h1>
            <h1 className="fullCont_Ln" id="l0">para continuar</h1>
        </section>
        <section className='fullCont_Btn'>
            <PDGButton/>
        </section>
    </div>
}