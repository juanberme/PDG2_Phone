import React, { useEffect, useRef, useState } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import Camera from '../components/camera.js';
import Blob from '../components/Blob.js';
import { useSearchParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase.js';

import '../styles/resultsPage.css';
import 'primeicons/primeicons.css';

const Results = () => {
    const [searchParams] = useSearchParams();
    const [userData, setUsersData] = useState();

    const [userCounter, setUserCounter] = useState(0);

    const [loadedData, setLoadedData] = useState(false);
    const [pattern, setPattern] = useState();
    const [intensity, setIntensity] = useState();
    const [rColor1, setRColor1] = useState();
    const [gColor1, setGColor1] = useState();
    const [bColor1, setBColor1] = useState();
    const [rColor2, setRColor2] = useState();
    const [gColor2, setGColor2] = useState();
    const [bColor2, setBColor2] = useState();
    const [soda, setSoda] = useState('');
    const [info, setInfo] = useState('');
    const mesh = useRef();

    //setUserCounter(userData.tags[0].counter + userData.tags[1].counter + userData.tags[2].counter + userData.tags[3].counter);

    //console.log(userData);
    //console.log(userCounter);

    useEffect(() =>{
        const handleSubmit = async() =>{
            try {
                const editCol = collection(db, 'users');
                const docRef = doc(editCol, searchParams.get("id"));
                const docData = await getDoc(docRef);
                setUsersData(docData.data());
                console.log('Document written with ID:', docRef.id);
                setLoadedData(true);
                //userCounter = userData.tags[0].counter + userData.tags[1].counter + userData.tags[2].counter + userData.tags[3].counter;
                //console.log(docData.data().tags[0].counter);

            } catch (error) {
                console.error(error.message);
            }
        }
        handleSubmit();
    }, [searchParams]);

    //console.log(userCounter);

    useEffect(() => {
      if(loadedData && userData && userData.tags && userData.tags.length === 4){
        console.log(' TAGS -------------------');
        console.log(userData.tags);
        setUserCounter(userData.tags[0].counter + userData.tags[1].counter + userData.tags[2].counter + userData.tags[3].counter);
        //setPattern(userData.tags[0].pattern);
        //setIntensity(userData.tags[1].intensity);
      }
    }, [userData]);

    useEffect(() => {
      console.log(userCounter);

      if(userCounter >= 13 && userCounter <= 16){
          console.log("Es manzana");
          setPattern(3);
          setIntensity(4.0);

          setRColor1(1.0)
          setGColor1(0.455);
          setBColor1(0.831);

          setRColor2(1.0);
          setGColor2(0.212);
          setBColor2(0.671);
          setSoda("Manzana Postobon");
          setInfo("Eres una persona familiar y amigable, te gustan las cosas sencillas como pasar un buen rato con tus amigos o una agradable charla con tu familia. Te gusta que las cosas estén bajo control y todos a tu alrededor se encuentren felices y tranquilos.");
      }else if(userCounter >= 11 &&  userCounter<= 13){
          console.log("Es Colombiana");
          setPattern(1);
          setIntensity(3.0)

          setRColor1(0.988);
          setGColor1(0.749);
          setBColor1(0.286);

          setRColor2(0.969);
          setGColor2(0.498);
          setBColor2(0.0);
          setSoda("Colombiana");
          setInfo("Eres una persona intensa y alegre, todos los que te rodean pueden sentir tu calor, pues tu eres su sol, y ellos tus planetas. Te gusta expresarte, ser libre, y vivir de forma agradable. Pero siempre responsable… sí, responsable. ");
      } else if(userCounter === 10){
        console.log("Es Bretaña");
        setPattern(2);
        setIntensity(5.0)

        setRColor1(0.898);
        setGColor1(0.925);
        setBColor1(0.957);

        setRColor2(0.569);
        setGColor2(0.651);
        setBColor2(1.0);
        setSoda("Bretaña Postobon");
        setInfo("Puede que te digan tibio, pero no está mal que te guste de todo un poquito. Puedes ser alguien difícil de leer, pero eso no importa, no eres un libro abierto para que todos te vean, sigue brillando con luz propia!!!")
      }else if(userCounter >= 7 && userCounter <= 9){
        console.log("Es 7Up");
        setPattern(2);
        setIntensity(5.0)

        setRColor1(0.937);
        setGColor1(1.0);
        setBColor1(0.98);

        setRColor2(0.38);
        setGColor2(0.816);
        setBColor2(0.584);
        setSoda("7Up");
        setInfo("Eres una persona fría y calculadora, eres sencille por lo que no necesitas demostrar nada, ni compararte con nadie. Sabes reconocer tu propio valor y eres independiente, aunque tal vez algo distante.");
      }else if(userCounter >= 4 && userCounter <= 6){
        console.log("Es uva");
        setPattern(0);
        setIntensity(3.3)

        setRColor1(0.976);
        setGColor1(0.957);
        setBColor1(0.961);

        setRColor2(0.502);
        setGColor2(0.137);
        setBColor2(0.573);
        setSoda("Uva Postobon");
        setInfo("Eres una persona dulce y feliz, la vida es el camino, y tú revisas hasta la última piedra. Amás disfrutar de las cosas pequeñas de la vida como un buen chiste y estar cerca de las personas que ama, TQM Nunca cambies.");
      }
    }, [userCounter]);

    //const pattern = userData.tags[0].pattern;
    //const pattern = userData && userData.tags ? userData.tags[0].pattern : 'default-pattern';
    //const intensity = userData.tags[1].intensity;
    //const intensity = userData && userData.tags ? userData.tags[1].intensity : 'default-intensity';

    //<h2>{[userData.tags[0].counter + userData.tags[1].counter + userData.tags[2].counter + userData.tags[3].counter ]}</h2>
  return (
    <section className='Rlt_CONT'>
      <section className='Blob_CONT'>
        <Canvas camera={{position: [10, 0, 10]}}>
          <Camera/>
          {loadedData && userData && userData.tags &&(
            //la parte de la linea 58 antes tenia solo hasta userdatatags
            <mesh ref={mesh}>
              <Blob
                pattern={pattern}
                intensity={intensity}
                color1={{r: rColor1, g: gColor1, b: bColor1}}
                color2={{r: rColor2, g: gColor2, b: bColor2}}
              />
            </mesh>
          )}
          <OrbitControls/>
        </Canvas>
      </section>

      <section className='Info_CONT'>
      {loadedData && userData && userData.tags && (
            <section>
              <div className='infoTitle_Cont'>
                <p className='Ttl_Element'>Eres una Gaseosa</p>
                <p className='Ttl_Element'>{soda}</p>
              </div>
              
              <div className='infoText_Cont'>
                <p>{info}</p>
              </div>
            </section>
          )}
      </section>
    </section>
  )}

export default Results;


