import { useState, useRef, useEffect } from 'react';
import { AnchorButton } from '../components/Btn';

import { Tag } from 'primereact/tag';
import { Knob } from 'primereact/knob';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';

import { useSearchParams } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const Tags3 = () => {
    const [stepInfo, setStepInfo] = useState(2);
    const [searchParams] = useSearchParams();

    const [value, setValue] = useState(60);
    const toast = useRef(null);
    const interval = useRef(null);
    let _val = 60;

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

    const stepsList = [
        {label: 'Paso 1'},
        {label: 'Paso 2'},
        {label: 'Paso 3'},
        {label: 'Paso 4'},
    ];

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

    //Temporalizador
    useEffect(() => {
        _val = value;

        interval.current = setInterval(() => {
            _val -= 1;

            if (_val === 0) {
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

  return (
    <section className='T1_CONT'>
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
            <AnchorButton onClick={handleSubmit} href={`/tags4?id=${searchParams.get('id')}`} label="Siguiente"/>
        </div>
    </section>
  )
}

export default Tags3