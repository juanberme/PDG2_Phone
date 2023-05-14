import React, { useEffect, useRef, useState } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import Camera from '../components/camera.js';
import Blob from '../components/Blob.js';
import { useSearchParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase.js';

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
        //console.log(userData.tags[0].pattern);
        //console.log(userData.tags[1].intensity);
    }, [searchParams]);

    useEffect(() => {
      if(loadedData && userData && userData.tags){
        setPattern(userData.tags[0].pattern);
        setIntensity(userData.tags[1].intensity);
      }
    });

    //const pattern = userData.tags[0].pattern;
    //const pattern = userData && userData.tags ? userData.tags[0].pattern : 'default-pattern';
    //const intensity = userData.tags[1].intensity;
    //const intensity = userData && userData.tags ? userData.tags[1].intensity : 'default-intensity';
  return (
    <div>
        <div className='3DPersonality' style={{width: "100%" , height: "300px"}}>
            <Canvas camera={{position: [10, 0, 10]}}>
                <Camera/>
                
                {userData ? (
                  <mesh ref={mesh}>
                    <Blob
                      pattern={userData.tags[0].pattern}
                      intensity={userData.tags[1].intensity}
                      color1={{r: userData.tags[2].r, g: userData.tags[2].g, b: userData.tags[2].b}}
                      color2={{r: userData.tags[3].r, g: userData.tags[3].g, b: userData.tags[3].b}}
                    />
                  </mesh>
                ) : null}
                <OrbitControls/>
            </Canvas>
        </div>
        <div className='results'>
            <p>Y la queso</p>
        </div>
    </div>
  )
}

export default Results;