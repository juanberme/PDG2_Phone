import React, { useMemo, useRef } from 'react';
import { AmbientLight, IcosahedronGeometry, MathUtils, MeshStandardMaterial } from 'three';
import vertexShader from '../shader/vertexShader.js';
import fragmentShader from '../shader/fragmentShader.js';
import { Canvas, useFrame } from '@react-three/fiber';

//POSIBLES FALLAS
//import vertexShaderPars from './pruebas/vertex_pars.js';
//import vertexShaderMain from './pruebas/vertex_main.js';

const Blob = () => {
const mesh = useRef();
const hover = useRef(false);

const uniforms = useMemo(() => {
  return {
    uTime: {value: 0},
    uIntensity: {value: 0.3}
  };
});

const onBeforeCompile = (shader) => {
    mesh.current.material.shader = shader
    //mesh.current.userData.shader = shader;
    shader.uniforms.uTime = uniforms.uTime;
    console.log(shader.vertexShader);
    console.log(shader.uniforms.uTime);

    //POSIBLES FALLAS
    //const parsVertexString = /*glsl*/ `#include <displacementmap_pars_vertex>`
    //shader.vertexShader = shader.vertexShader.replace(parsVertexString, parsVertexString + vertexShaderPars);

    //const mainVertexString = /*glsl*/ `#include <displacementmap_vertex>`
    //shader.vertexShader = shader.vertexShader.replace(mainVertexString, mainVertexString + vertexShaderMain);
}

useFrame((state) =>{
  const {clock} = state;

 
  if(mesh.current){
    mesh.current.material.uniforms.uTime.value = 0.4 * clock.getElapsedTime();

    //mesh.current.material.uniforms.uTime.value =0.4 * clock.getElapsedTime();

    //mesh.current.material.uniforms.uIntensity.value = MathUtils.lerp(mesh.current.material.uniforms.uIntensity.value, hover.current ? 1 : 0.15, 0.02);
  }

  //shaders
  //<meshStandardMaterial onBeforeCompile={onBeforeCompile}/>
  
  
  console.log(typeof vertexShader);
  
})
  return (

    <mesh ref={mesh} scale={3.0}>
        <icosahedronGeometry args={[1, 100]}/>
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms}/>
    </mesh> 
  )
}

export default Blob;


