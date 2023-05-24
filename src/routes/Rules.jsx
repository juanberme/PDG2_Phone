import { Image } from 'primereact/image';

import { PDGButton } from '../components/PDGButton.js';

import '../styles/rulesPage.css';
import 'primeicons/primeicons.css';


export default function Rules(){
    return <section className="Rules_CONT">
        <main className="Info_CONT_Rules">
            <div className="Title_Rules">
                <h1 className="rulesTxt" id='rulesTitle'>Reglas</h1>
            </div>

            <div className="rulesList">
                <p className="rulesList_line">
                    <i className="pi pi-verified" id='rulesList_icon'></i>
                    <span className="rulesTxt" id='rulesList_Txt'>Lee la pregunta que aparece <strong>arriba de la pantalla</strong></span>
                </p>
                <p className="rulesList_line">
                    <i className="pi pi-check-circle" id='rulesList_icon'></i>
                    <span className="rulesTxt" id='rulesList_Txt'>Escoge la que <strong>mejor se relacione</strong> contigo</span>
                </p>
                <p className="rulesList_line">
                    <i className="pi pi-exclamation-triangle" id='rulesList_icon'></i>
                    <span className="rulesTxt" id='rulesList_Txt'>No hay respuestas <strong>buenas o malas</strong></span>
                </p>
                <p className="rulesList_line">
                    <i className="pi pi-image" id='rulesList_icon'></i>
                    <span className="rulesTxt" id='rulesList_Txt'><strong>Abajo de la imagen</strong> encontrarás tu progreso</span>
                </p>
                <p className="rulesList_line">
                    <i className="pi pi-heart" id='rulesList_icon'></i>
                    <span className="rulesTxt" id='rulesList_Txt'>No te lo tomes <strong>TAN</strong> personal, al final es un juego</span>
                </p>
            </div>
        </main>

        <section className="Interact_CONT_Rules">
            <div className="interactTxt">
                <h3 className="rulesTxt" id='rulesSubTitle'>Presiona el botón para continuar</h3>
            </div>
            <div className="interactBtn">
                <PDGButton/>
            </div>
        </section>

        <aside className="Deco_CONT_Rules">
            <span className="imgBottle">
                <Image src='https://tomatelavida.com.co/wp-content/uploads/2022/09/Manzana-Postob%C3%B3n-2022-P.png'/>
            </span>
            <span className="imgBottle">
                <Image src='https://tomatelavida.com.co/wp-content/uploads/2022/09/Colombiana-La-Nuestra-2022-P.png'/>
            </span>
            <span className="imgBottle">
                <Image src='https://tomatelavida.com.co/wp-content/uploads/2022/09/Una-Postob%C3%B3n-2022-P.png'/>
            </span>
            <span className="imgBottle">
                <Image src='https://tomatelavida.com.co/wp-content/uploads/2017/08/7UP-350-ml-P-2022.png'/>
            </span>
        </aside>
    </section>
}