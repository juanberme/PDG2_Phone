import React, { useState } from 'react'
import { AnchorButton } from '../components/Btn';
import { Tag } from 'primereact/tag';
import { useSearchParams } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const Tags2 = () => {

    function getRandomFloat(){
        return (((Math.random()*6)).toFixed(1)).toString();
    }

    const [searchParams] = useSearchParams();

    const [items, setItems] = useState([
        {id:1, value : "Intuitivo(a)", activated:false, intensity: getRandomFloat()},
        {id:2, value : "Flexible", activated:false, intensity: getRandomFloat()},
        {id:3, value : "Imaginativo(a)", activated:false, intensity: getRandomFloat()},
        {id:4, value : "Distraído(a)", activated:false, intensity: getRandomFloat()},
        {id:5, value : "Influenciador(a)", activated:false, intensity: getRandomFloat()},
        {id:6, value : "Observador(a)", activated:false, intensity: getRandomFloat()},
        {id:7, value : "Rígido(a)", activated:false, intensity: getRandomFloat()},
        {id:8, value : "Realista", activated:false, intensity: getRandomFloat()},
        {id:9, value : "Atento(a)", activated:false, intensity: getRandomFloat()},
        {id:0, value : "Reservado(a)", activated:false, intensity: getRandomFloat()},
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
            <AnchorButton onClick={handleSubmit} href={`/tags3?id=${searchParams.get('id')}`} label="Siguiente"/>
        </div>
    </div>
  )
}

export default Tags2