import React, { useEffect, useRef, useState } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import Camera from '../components/camera.js';
import Blob from '../components/Blob.js';
import { useSearchParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase.js';

import { Paginator } from 'primereact/paginator';

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
      if(loadedData && userData && userData.tags){
        setUserCounter(userData.tags[0].counter + userData.tags[1].counter + userData.tags[2].counter + userData.tags[3].counter);
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
        }
        //setPattern(userData.tags[0].pattern);
        //setIntensity(userData.tags[1].intensity);
      }
    });

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
          {userData && userCounter && (
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
        <div className='Ttl_DIV'>
          <p className='Ttl_Element'><strong id='Ttl_Strong'>Esta es la figura</strong> que te representa:</p>
          {/*userData && userData.tags && userData.tags[2] && userData.tags[3] && (
              <p className='Ttl_Element' id='userName'>{userData.name}</p>
          )*/}
          {userData && userData.tags && userCounter &&(
            <div>
            <h2>{userCounter}</h2>
          </div>
          )

              
          }
        </div>

        {/*userData && userData.tags && userData.tags[2] && userData.tags[3] && (
          <div className="Tags_DIV">
            <p className="userTagLine">
              <i className="iconCircle pi pi-circle-fill"></i> <span className='txt_Line'>{userData.tags[0].value}</span>
            </p>
            <p className="userTagLine">
              <i className="iconCircle pi pi-circle-fill"></i> <span className='txt_Line'>{userData.tags[1].value}</span>
            </p>
            <p className="userTagLine">
              <i className="iconCircle pi pi-circle-fill"></i> <span className='txt_Line'>{userData.tags[2].value}</span>
            </p>
            <p className="userTagLine">
              <i className="iconCircle pi pi-circle-fill"></i> <span className='txt_Line'>{userData.tags[3].value}</span>
            </p>
          </div>
        )*/}
      </section>
    </section>
  )}

export default Results;

