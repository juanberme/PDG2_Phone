import React, { useState } from 'react'
import { AnchorButton } from '../components/Btn';
import { Tag } from 'primereact/tag';
import { useSearchParams } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const Tags3 = () => {
    const [searchParams] = useSearchParams();

    const [items, setItems] = useState([
        {id:1, value : "Espiritual", activated:false, r: 0.475, g: 0.678, b: 0.863},
        {id:2, value : "Subjetivo(a)", activated:false, r: 1.0, g: 0.753, b: 0.624},
        {id:3, value : "Flexible", activated:false, r: 0.765, g: 0.824, b: 0.835},
        {id:4, value : "Emocional", activated:false, r: 0.804, g: 0.275, b: 0.192},
        {id:5, value : "Caótico(a)", activated:false, r: 0.784, g: 0.435, b: 0.788},
        {id:6, value : "Científico(a)", activated:false, r: 0.976, g: 0.957, b: 0.961},
        {id:7, value : "Objetivo(a)", activated:false, r: 0.102, g: 0.227, b: 0.227},
        {id:8, value : "Rígido(a)", activated:false, r: 0.2, g: 0.196, b: 0.196},
        {id:9, value : "Racional", activated:false, r: 0.678, g: 0.729, b: 0.741},
        {id:0, value : "Lógico(a)", activated:false, r: 0.133, g: 0.18, b: 0.314},
    ]);

    const handleSubmit = async() =>{
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

    const handleClickTag = (index) => {
        const LIMIT = 1;
        if(items.filter(({activated}) => activated).length >= LIMIT && !items[index].activated) return;

        const copy = [...items];
        console.log(index);
        copy[index].activated = !copy[index].activated;
        setItems(copy);
    }
  return (
    <div>
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
        <div>
            <AnchorButton onClick={handleSubmit} href={`/tags4?id=${searchParams.get('id')}`} label="Siguiente"/>
        </div>
    </div>
  )
}

export default Tags3