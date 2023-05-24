import { collection, doc, updateDoc, getDoc } from 'firebase/firestore';

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ProgressBar } from 'primereact/progressbar';
import { Image } from 'primereact/image';
import { Tag } from 'primereact/tag';

import { AnchorButton } from '../components/Btn';
import { db } from '../utils/firebase';

import '../styles/tagPage.css';

export default function Tags(){
    const [searchParams] = useSearchParams();

const [items, setItems] = useState([
    {id:1, value : "Soltero", activated:false, text: "No tengo tiempo para eso ahora", counter: 4},
    {id:2, value : "Coqueto", activated:false, text: "Yooo. Soy el aventurero", counter: 3},
    {id:3, value : "Indiferente", activated:false, text: "No me cae ni una gota de lluvia", counter: 2},
    {id:4, value : "Privado(a)", activated:false, text: "Felizmente en una relación", counter: 1},
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

return <section className='Tags_CONT'>
    <section className='Info_CONT_Tags'>
        <div className="infoTitle">
            <h1 className="TagsTxt" id='TagsTitle'>¿Cómo es tu vida amorosa?</h1>
        </div>

        <div className="infoImage">
            <Image src='https://images.unsplash.com/photo-1491582990992-68ec88e070a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80' alt='Imagen_Principal' width='365em'd/>
        </div>

        <div className="infoProgress">
            <ProgressBar value={50} style={{ height: '10px' }}></ProgressBar>
        </div>
    </section>

    <section className='Interact_CONT_Tags'>
        <div className='interactTagList_Tags'>
            {items.map(({ id, text, activated }, index) => (
                <Tag style={activated ? { background: 'red' } : {}} className='tag' onClick={() => handleClickTag(index)} key={id} value={text} rounded/>
            ))}
        </div>
        
        <div className="interactButton_Tags">
            <AnchorButton id='btn_cont' onClick={handleCSubmit} href={`/tags3?id=${searchParams.get('id')}`} label="Siguiente"/>
        </div>
    </section>
</section>
}