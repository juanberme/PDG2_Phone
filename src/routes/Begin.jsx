import { Button } from 'primereact/button';
import { PDGButton } from '../components/PDGButton.js';
import '../styles/beginPage.css';
import '../styles/mediaqueries.css';

export default function Begin(){
    return <div className='fullCont'>
        <section className='fullCont_Ttl'>
            <h1 id='magic'>Estás a punto de entrar a una experiencia distinta</h1>
        </section>
        <section className='fullCont_Btn'>
            <PDGButton/>
        </section>
    </div>
}