import React, { useState } from 'react'
import { AnchorButton } from '../components/Btn';
import { Tag } from 'primereact/tag';
import { useSearchParams } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const Tags4 = () => {
    const [searchParams] = useSearchParams();
    const [viewData, setViewData] = useState();

    const [items, setItems] = useState([
        {id:1, value : "Distraído(a)", activated:false, r: 0.424, g: 0.745, b: 0.929},
        {id:2, value : "Caótico(a)", activated:false, r: 0.502, g: 0.137, b: 0.573},
        {id:3, value : "Diferente", activated:false, r: 0.941, g: 0.925, b: 0.341},
        {id:4, value : "Esporádico(a)", activated:false, r: 0.353, g: 1.0, b: 0.082},
        {id:5, value : "Improvisador(a)", activated:false, r: 0.651, g: 0.239, b: 0.251},
        {id:6, value : "Atento(a)", activated:false, r: 0.914, g: 0.722, b: 0.447},
        {id:7, value : "Ordenado(a)", activated:false, r: 0.082, g: 0.082, b: 0.082},
        {id:8, value : "Moda", activated:false, r: 0.616, g: 0.459, b: 0.796},
        {id:9, value : "Metodológico(a)", activated:false, r: 0.059, g: 0.639, b: 0.694},
        {id:0, value : "Planeador(a)", activated:false, r: 1.0, g: 0.608, b: 0.259},
    ]);

    const handleSubmit = async() =>{
        try {
            const activeItem = items.filter(({activated}) => activated);

            if(activeItem.length === 0) return;
            
            const editCol = collection(db, 'users');
            const docRef = doc(editCol, searchParams.get("id"));
            const docData = await getDoc(docRef);
            setViewData(docData.data());
            const {tags} = docData.data();
            await updateDoc(docRef, {tags: tags ? [...tags, ...activeItem] : activeItem});

            //console.log(docData.data());
            console.log('Document written with ID:', docRef.id);
        } catch (error) {
            console.error(error.message);
        }
    }

    //console.log(viewData);

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
            <AnchorButton onClick={handleSubmit} href={`/resultados?id=${searchParams.get('id')}`} label="Enviar"/>
        </div>
    </div>
  )
}

export default Tags4