import { Image } from 'primereact/image';
import { Ripple } from 'primereact/ripple';

import { PDGButton } from '../components/PDGButton.js';
import bottomImage from '../gallery/postobon-fondo.jpg';

import '../styles/beginPage.css';

export default function Begin(){
    return <section className='fullCont'>
        <section className="Logo_CONT">
            <div className="logoImg">
                <Image src='https://upload.wikimedia.org/wikipedia/commons/8/89/Postob%C3%B3n_S._A._logo.svg' alt='logo_Postobon' width='225' />
            </div>
            <div className="logoTxt">
                <h3 className='beginTxt' id='beginSubTitle'>Te invita a conocer</h3>
            </div>
        </section>

        <section className="Title_CONT">
            <h1 className="beginTxt" id='beginTitle'>¿Qué gaseosa eres según tu personalidad?</h1>
        </section>
            
        <section className="Interact_CONT">
            <div className="interactTxt">
                <h3 className="beginTxt" id='beginSubTitle'>Presiona el botón para continuar</h3>
            </div>
            <div className="interactBtn">
                <PDGButton className='p-ripple'/>
                <Ripple />
            </div>
        </section>

        <aside className="Deco_CONT_Begin">
            <span className="imgBottle">
                <img src={bottomImage} alt="Bottom_Image" />
            </span>
        </aside>
    </section>
}