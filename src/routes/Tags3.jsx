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
        {id:1, value : "Soltero", activated:false, text: "No tengo tiempo para eso ahora", counter: 4},
        {id:2, value : "Coqueto", activated:false, text: "Yooo. Soy el aventurero", counter: 3},
        {id:3, value : "Indiferente", activated:false, text: "No me cae ni una gota de lluvia", counter: 2},
        {id:4, value : "Privado(a)", activated:false, text: "👀... *Eso es secreto*", counter: 1},
    ]);

    const stepsList = [
        {label: 'Energía'},
        {label: 'Intensidad'},
        {label: 'Sabor'},
        {label: 'Olor'},
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
            <p className='Ttl_Strong'><strong>Escoge 1 palabra</strong></p>
            <p className="Ttl_Normal">que mejor te define en menos de:</p>
        </section>

        <section className='Knb_CONT'>
            <Toast ref={toast}></Toast>
            <Knob value={value} max={60} readOnly/>
        </section>

        <section className="Stp_CONT">
            <Steps model={stepsList} activeIndex={stepInfo}/>
        </section>

        <section className='Tgs_CONT'>
            {items.map(({id, value, activated, text, counter}, index) => 
                <Tag 
                    style={activated ? {background: "red"} : {}}
                    className='tag' 
                    onClick={() => handleClickTag(index)}
                    key={id}
                    value={text}
                    rounded/>)}
        </section>

        <div className='btn'>
            <AnchorButton onClick={handleSubmit} href={`/tags4?id=${searchParams.get('id')}`} label="Siguiente"/>
        </div>
    </section>
  )
}

export default Tags3