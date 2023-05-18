import React, { useEffect, useRef, useState } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import Camera from '../components/camera.js';
import Blob from '../components/Blob.js';
import { useSearchParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase.js';

import { Button } from 'primereact/button';

import '../styles/resultsPage.css';
import 'primeicons/primeicons.css';

const Results = () => {
    const [searchParams] = useSearchParams();
    const [userData, setUsersData] = useState();

    const [loadedData, setLoadedData] = useState(false);
    const [pattern, setPattern] = useState();
    const [intensity, setIntensity] = useState();
    const mesh = useRef();

    useEffect(() =>{
        const handleSubmit = async() =>{
            try {
                const editCol = collection(db, 'users');
                const docRef = doc(editCol, searchParams.get("id"));
                const docData = await getDoc(docRef);
                setUsersData(docData.data());
                console.log('Document written with ID:', docRef.id);
                console.log(userData);
                setLoadedData(true);

            } catch (error) {
                console.error(error.message);
            }
        }
        handleSubmit();
        console.log(userData);
    }, [searchParams]);

    /*useEffect(() => {
      if(loadedData && userData && userData.tags){
        setPattern(userData.tags[0].pattern);
        setIntensity(userData.tags[1].intensity);
      }
    });*/

    //const pattern = userData.tags[0].pattern;
    //const pattern = userData && userData.tags ? userData.tags[0].pattern : 'default-pattern';
    //const intensity = userData.tags[1].intensity;
    //const intensity = userData && userData.tags ? userData.tags[1].intensity : 'default-intensity';
  return (
    <section className='Rlt_CONT'>
      <section className='Blob_CONT'>
        <Canvas camera={{position: [10, 0, 10]}}>
          <Camera/>
          {userData && userData.tags && userData.tags[2] && userData.tags[3] && (
            //la parte de la linea 58 antes tenia solo hasta userdatatags
            <mesh ref={mesh}>
              <Blob
                pattern={userData.tags[0].pattern}
                intensity={userData.tags[1].intensity}
                color1={{r: userData.tags[2].r, g: userData.tags[2].g, b: userData.tags[2].b}}
                color2={{r: userData.tags[3].r, g: userData.tags[3].g, b: userData.tags[3].b}}
              />
            </mesh>
          )}
          <OrbitControls/>
        </Canvas>
      </section>

      <section className='Info_CONT'>
        <div className='Ttl_DIV'>
          <p className='Ttl_Element'><strong id='Ttl_Strong'>Esta es la figura</strong> que te representa:</p>
          {userData && userData.tags && userData.tags[2] && userData.tags[3] && (
              <p className='Ttl_Element'>{userData.name}</p>
          )}
        </div>

        <div className="Tags_DIV">
          {userData && userData.tags && userData.tags[2] && userData.tags[3] && (
           <div>
              <p className="userTagLine">
                <i className="pi pi-circle-fill"></i> <span>{userData.tags[0].value}</span>
              </p>
              <p className="userTagLine">
                <i className="pi pi-circle-fill"></i> <span>{userData.tags[1].value}</span>
              </p>
              <p className="userTagLine">
                <i className="pi pi-circle-fill"></i> <span>{userData.tags[2].value}</span>
              </p>
              <p className="userTagLine">
                <i className="pi pi-circle-fill"></i> <span>{userData.tags[3].value}</span>
              </p>
           </div>
              

          )}
        </div>

        <div className='btn'>
          <Button label='Finalizar'/>
        </div>
      </section>
    </section>
  )}

export default Results;