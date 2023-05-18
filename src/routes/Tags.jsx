import { async } from '@firebase/util';
import { collection, doc, updateDoc, getDoc } from 'firebase/firestore';


import { Tag } from 'primereact/tag';
import { useState, useRef, useEffect } from 'react';
import { Knob } from 'primereact/knob';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';


import { useSearchParams } from 'react-router-dom';
import { AnchorButton } from '../components/Btn';
import { db } from '../utils/firebase';

import '../styles/tagPage.css';

export default function Tags(){
    const [stepInfo, setStepInfo] = useState(0);
    const [searchParams] = useSearchParams();

    const [value, setValue] = useState(0);
    const toast = useRef(null);
    const interval = useRef(null);
    let _val = 60;

    const [items, setItems] = useState([
        {id:1, value : "Casero(a)", activated:false, pattern: 3},
        {id:2, value : "Tímido(a)", activated:false, pattern: 2},
        {id:3, value : "Reservado(a)", activated:false, pattern: 2},
        {id:4, value : "Introvertido(a)", activated:false, pattern: 3},
        {id:5, value : "Solitario(a)", activated:false, pattern: 2},
        {id:6, value : "Fiestero(a)", activated:false, pattern: 0},
        {id:7, value : "Elocuente", activated:false, pattern: 0},
        {id:8, value : "Influenciador(a)", activated:false, pattern: 1},
        {id:9, value : "Extrovertido(a)", activated:false, pattern: 1},
        {id:0, value : "Amiguero(a)", activated:false, pattern: 0},
    ]);

    const stepsList = [
        {label: 'Paso 1'},
        {label: 'Paso 2'},
        {label: 'Paso 3'},
        {label: 'Paso 4'},
    ];

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
        if(items.filter(({activated}) => activated).length >= LIMIT && !items[index].activated) return;

        const copy = [...items];
        console.log(index);
        copy[index].activated = !copy[index].activated;
        setItems(copy);
    }

    //Temporalizador
    useEffect(() => {
        _val = value;

        interval.current = setInterval(() => {
            _val += 1;

            if (_val >= 60) {
                toast.current.show({ severity: 'info', summary: 'Finalizó el tiempo!', detail: 'Si necesitas más tiempo, puedes quedarte :)' });
                clearInterval(interval.current);
            }

            setValue(_val);
        }, 1000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
        };
    }, []);
    
    return <section className='T1_CONT'>
        <section className='titleTxt'>
            <p><strong id='Ttl_Strong'>Escoge 1 palabra</strong> que más te definen en menos de 60s:</p>
        </section>

        <section className='Knb_CONT'>
            <Toast ref={toast}></Toast>
            <Knob value={value} max={60} readOnly/>
        </section>

        <section className="Stp_CONT">
            <Steps model={stepsList} activeIndex={stepInfo}/>
        </section>

        <section className='Tgs_CONT'>
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
                label="Continuar"/>
        </div>
    </section>
}