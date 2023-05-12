import React, { useRef } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import Camera from '../components/camera.js';
import Blob from '../components/Blob.js';

const Results = () => {

    const mesh = useRef();
  return (
    <div>
        <div className='3DPersonality' style={{width: "100%" , height: "100vh"}}>
            <Canvas camera={{position: [10, 0, 10]}}>
                <Camera/>
                <mesh ref={mesh}>
                    <Blob/>
                </mesh>
                <OrbitControls/>
            </Canvas>
        </div>
        
    </div>
  )
}

export default Results;