import React, { useState } from 'react'
import { AnchorButton } from '../components/Btn';
import { Tag } from 'primereact/tag';
import { useSearchParams } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const Tags4 = () => {

    function getRandomR(){
        return Math.random().toFixed(3);
    }
    function getRandomG(){
        return Math.random().toFixed(3);
    }
    function getRandomB(){
        return Math.random().toFixed(3);
    }

    const [searchParams] = useSearchParams();

    const [items, setItems] = useState([
        {id:1, value : "Distraído(a)", activated:false, r: getRandomR(), g: getRandomG(), b: getRandomB()},
        {id:2, value : "Caótico(a)", activated:false, r: getRandomR(), g: getRandomG(), b: getRandomB()},
        {id:3, value : "Diferente", activated:false, r: getRandomR(), g: getRandomG(), b: getRandomB()},
        {id:4, value : "Esporádico(a)", activated:false, r: getRandomR(), g: getRandomG(), b: getRandomB()},
        {id:5, value : "Improvisador(a)", activated:false, r: getRandomR(), g: getRandomG(), b: getRandomB()},
        {id:6, value : "Atento(a)", activated:false, r: getRandomR(), g: getRandomG(), b: getRandomB()},
        {id:7, value : "Ordenado(a)", activated:false, r: getRandomR(), g: getRandomG(), b: getRandomB()},
        {id:8, value : "Moda", activated:false, r: getRandomR(), g: getRandomG(), b: getRandomB()},
        {id:9, value : "Metodológico(a)", activated:false, r: getRandomR(), g: getRandomG(), b: getRandomB()},
        {id:0, value : "Planeador(a)", activated:false, r: getRandomR(), g: getRandomG(), b: getRandomB()},
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
        const LIMIT = 5;
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
            <AnchorButton onClick={handleSubmit} href="#" label="Enviar"/>
        </div>
    </div>
  )
}

export default Tags4