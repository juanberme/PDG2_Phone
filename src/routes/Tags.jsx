import { async } from '@firebase/util';
import { addDoc, getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnchorButton } from '../components/Btn';
import { db } from '../utils/firebase';

import '../styles/tagPage.css';
import '../styles/mediaQTag.css';

export default function Tags(){

    const [searchParams] = useSearchParams();

    const [items, setItems] = useState([
        {id:1, value : "Casero(a)", activated:false},
        {id:2, value : "Fiestero(a)", activated:false},
        {id:3, value : "Tímido(a)", activated:false},
        {id:4, value : "Reservado(a)", activated:false},
        {id:5, value : "Extorvertido(a)", activated:false},
        {id:6, value : "Solitario(a)", activated:false},
    ]);

    //sconst 
    const handleCSubmit = async () => {
        try {
            const editCol = collection(db, 'users');
            const docRef = doc(editCol, searchParams.get("id"));
            await updateDoc(docRef, {tags: items.filter(({activated}) => activated)});

            console.log('Document written with ID:', docRef.id);
        } catch (error) {
            console.error(error.message);
        }
        
    }
    
    //Para hacer que el valor se cambie en el setValue
    const handleClickTag = (index) => {
        const LIMIT = 5;
        if(items.filter(({activated}) => activated).length >= LIMIT && !items[index].activated) return;

        const copy = [...items];
        console.log(index);
        copy[index].activated = !copy[index].activated;
        setItems(copy);
    }
    
    return <div className='page'>
        <section className='titleTxt'>
            <p>Escoge las <strong>5 palabras</strong> que más te definen en menos de:</p>
        </section>

        <section className='clock'>
            <h5>aqui va el reloj</h5>
        </section>

        <section className='tags'>
            {items.map(({id, value, activated}, index) => 
                <Tag 
                    style={activated ? {background: "red"} : {}}
                    className='tag' 
                    onClick={() => handleClickTag(index)}
                    key={id}
                    value={value}
                    rounded/>)}
        </section>
        
        <div className='btn'>
            <AnchorButton id='btn_cont' onClick={handleCSubmit} href="/#" label="Ingresar"/>
        </div>
    </div>
    
}



