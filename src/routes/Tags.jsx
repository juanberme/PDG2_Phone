import { async } from '@firebase/util';
import { addDoc, getDocs, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnchorButton } from '../components/Btn';
import { db } from '../utils/firebase';

import '../styles/tagPage.css';

export default function Tags(){

    const [searchParams] = useSearchParams();

    const [items, setItems] = useState([
        {id:1, value : "Casero(a)", activated:false, pattern: 0},
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
            <AnchorButton 
                id='btn_cont' 
                onClick={handleCSubmit}
                href={`/tags2?id=${searchParams.get('id')}`} 
                label="Ingresar"/>
        </div>
    </div>
    
}



