import { useState, useRef } from 'react';
import { AnchorButton } from '../components/Btn';
import { Tag } from 'primereact/tag';
import { useSearchParams } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const Tags2 = () => {
    const [searchParams] = useSearchParams();

    const [value, setValue] = useState(0);
    const toast = useRef(null);
    const interval = useRef(null);
    let _val = 60;

    const [items, setItems] = useState([
        {id:1, value : "Intuitivo(a)", activated:false, intensity: "1.3"},
        {id:2, value : "Flexible", activated:false, intensity: "2.5"},
        {id:3, value : "Imaginativo(a)", activated:false, intensity: "3.3"},
        {id:4, value : "Distraído(a)", activated:false, intensity: "4.2"},
        {id:5, value : "Influenciador(a)", activated:false, intensity: "5.1"},
        {id:6, value : "Observador(a)", activated:false, intensity: "6.4"},
        {id:7, value : "Rígido(a)", activated:false, intensity: "7.1"},
        {id:8, value : "Realista", activated:false, intensity: "8.3"},
        {id:9, value : "Atento(a)", activated:false, intensity: "9.5"},
        {id:0, value : "Reservado(a)", activated:false, intensity: "10.0"},
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
    <section className='T1_CONT'>
        <section className='titleTxt'>
            <p><strong id='Ttl_Strong'>Escoge la palabra</strong> que más te definen en menos de:</p>
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
            <AnchorButton onClick={handleSubmit} href={`/tags3?id=${searchParams.get('id')}`} label="Siguiente"/>
        </div>
    </section>
  )
}

export default Tags2