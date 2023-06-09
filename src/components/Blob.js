import React, { useMemo, useRef } from 'react';
import { AmbientLight, IcosahedronGeometry, MathUtils, MeshStandardMaterial } from 'three';
import vertexShader from '../shader/vertexShader.js';
import fragmentShader from '../shader/fragmentShader.js';
import { Canvas, useFrame } from '@react-three/fiber';

//POSIBLES FALLAS
//import vertexShaderPars from './pruebas/vertex_pars.js';
//import vertexShaderMain from './pruebas/vertex_main.js';

const Blob = ({pattern = 1, intensity = 1.0, color1 = {r: 1.0, g: 1.0, b: 1.0}, color2 = {r: 1.0, g: 1.0, b: 1.0}}) => {
const mesh = useRef();
const hover = useRef(false);

const uniforms = useMemo(() => {
  return {
    uTime: {value: 0},
    uIntensity: {value: 0.5},
    uForce: {value: intensity},
    uPattern: {value: pattern},
    uR1: {value: color1.r},
    uG1: {value: color1.g},
    uB1: {value: color1.b},
    uR2: {value: color2.r},
    uG2: {value: color2.g},
    uB2: {value: color2.b}
  };
}, []);

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
    mesh.current.material.uniforms.uForce.value = intensity;
    mesh.current.material.uniforms.uPattern.value = pattern;
    mesh.current.material.uniforms.uR1.value = color1.r;
    mesh.current.material.uniforms.uG1.value = color1.g;
    mesh.current.material.uniforms.uB1.value = color1.b;
    mesh.current.material.uniforms.uR2.value = color2.r;
    mesh.current.material.uniforms.uG2.value = color2.g;
    mesh.current.material.uniforms.uB2.value = color2.b;

    //mesh.current.material.uniforms.uTime.value =0.4 * clock.getElapsedTime();

    //mesh.current.material.uniforms.uIntensity.value = MathUtils.lerp(mesh.current.material.uniforms.uIntensity.value, hover.current ? 1 : 0.15, 0.02);
  }

  //shaders
  //<meshStandardMaterial onBeforeCompile={onBeforeCompile}/>
  
  
  //console.log(typeof vertexShader);
  
})
  return (

    <mesh ref={mesh} scale={3.0}>
        <icosahedronGeometry args={[1, 100]}/>
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms}/>
    </mesh> 
  )
}

export default Blob;


