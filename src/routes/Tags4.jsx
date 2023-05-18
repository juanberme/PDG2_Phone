import { useState, useRef, useEffect } from 'react';
import { AnchorButton } from '../components/Btn';

import { Tag } from 'primereact/tag';
import { Knob } from 'primereact/knob';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';

import { useSearchParams } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const Tags4 = () => {
    const [stepInfo, setStepInfo] = useState(3);
    const [searchParams] = useSearchParams();
    const [viewData, setViewData] = useState();

    const [value, setValue] = useState(0);
    const toast = useRef(null);
    const interval = useRef(null);
    let _val = 60;

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
            <AnchorButton onClick={handleSubmit} href={`/resultados?id=${searchParams.get('id')}`} label="Enviar"/>
        </div>
    </section>
  )
}

export default Tags4