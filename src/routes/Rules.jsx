import '../styles/rulesPage.css';
import 'primeicons/primeicons.css';

import { collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { db } from '../utils/firebase';

import { Button } from 'primereact/button';

import bottomImage from '../gallery/postobon-fondo.jpg';


export default function Rules(){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    //sconst 
    const handleCSubmit = async () => {
        try {
            const editCol = collection(db, 'users');
            const docRef = doc(editCol, searchParams.get("id"));
            const docData = await getDoc(docRef);
            const {tags} = docData.data();
            await updateDoc(docRef, {tags});

            console.log('Document written with ID:', docRef.id);
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleContinue = () => {
        navigate(`/tags?id=${doc.id}`);
    }

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
                <Button id='btn_ing' onClick={handleContinue} label="Ingresar"/>
            </div>
        </section>

        <aside className="Deco_CONT_Rules">
            <span className="imgBottle">
                <img src={bottomImage} alt="Bottom_Image" />
            </span>
        </aside>
    </section>
}