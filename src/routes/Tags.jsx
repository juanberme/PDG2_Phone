import { collection, doc, updateDoc, getDoc } from 'firebase/firestore';

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { AnchorButton } from '../components/Btn';
import { db } from '../utils/firebase';

import '../styles/tagPage.css';
import imgBack1 from '../gallery/fondo-rumba.jpg';

export default function Tags(){
    const [searchParams] = useSearchParams();

    const [items, setItems] = useState([
        {id:1, value : "Responsable", activated:false, text: "La mamá o el papá del grupo", counter: 4},
        {id:2, value : "Fiestero(a)", activated:false, text: "Traigan la botella", counter: 3},
        {id:3, value : "Introvertido(a)", activated:false, text: "Me voy temprano, si es que voy", counter: 2},
        {id:4, value : "Burletero(a)", activated:false, text: "Me termino riendo de todos", counter: 1},
    ]);

    //sconst 
    const handleCSubmit = async () => {
        try {
            const activeItem = items.filter(({activated}) => activated);

            if(activeItem.length === 0) return;

            const editCol = collection(db, 'users');
            const docRef = doc(editCol, searchParams.get("id"));
            const docData = await getDoc(docRef);
            const {tags} = docData.data();
            await updateDoc(docRef, {tags: tags ? [...tags, ...activeItem] : activeItem});

            console.log('Document written with ID:', docRef.id);
        } catch (error) {
            console.error(error.message);
        }
        
    }
    
    //Para hacer que el valor se cambie en el setValue
    const handleClickTag = (index) => {
    const LIMIT = 1;
    
    if (items.filter(({ activated }) => activated).length > LIMIT && !items[index].activated) return;
    
    const copy = [...items];
    const lastActivatedIndex = copy.findIndex(({ activated }) => activated);

    if (lastActivatedIndex !== -1) {
        copy[lastActivatedIndex].activated = false;
    }
    copy[index].activated = !copy[index].activated;
    setItems(copy);
    //console.log(index);
    };

    //Dialog Config
    const [visible, setVisible] = useState(false);
    
    return <section className='Tags_CONT'>
        <section className='Info_CONT_Tags'>
            <div className="infoTitle">
                <h1 className="TagsTxt" id='TagsTitle'>¿Quién eres cuando vas de rumba?</h1>
            </div>

            <div className="infoImage">
                <img src={imgBack1} alt="imagenTitulo" id='t-img' />
            </div>

            <div className="infoProgress">
                <ProgressBar value={25} style={{ height: '10px' }}></ProgressBar>
            </div>
        </section>

        <section className='Interact_CONT_Tags'>
            <div className='interactTagList_Tags'>
                {items.map(({ id, text, activated }, index) => (
                    <Tag style={activated ? { background: 'red' } : {}} className='tag' onClick={() => handleClickTag(index)} key={id} value={text} rounded/>
                ))}
            </div>
            
            <div className="interactButton_Tags">
                <AnchorButton id='btn_cont' onClick={handleCSubmit} href={`/tags2?id=${searchParams.get('id')}`} label="Siguiente pregunta"/>
            </div>
        </section>

        <section className="MiniButton_T">
            <Button icon="pi pi-question-circle p-button-icon" id='minibtn_t' onClick={() => setVisible(true)} />

            <Dialog header="Instrucciones" visible={visible} maximizable style={{width: '85vw'}} onHide={() => setVisible(false)}>
                <p>
                    <strong className='rules-cont_Ttl'>Reglas</strong>
                </p>
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
            </Dialog>
        </section>
    </section>
}