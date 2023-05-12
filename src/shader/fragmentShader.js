const fragmentShader = /*glsl*/ `
    uniform float uIntensity;
    uniform float uTime;

    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vDisplacement;

    void main(){
        float distort = 2.0 * vDisplacement * uIntensity * sin(vUv.y * 1.0);

        //color negro
        //vec3 color = vec3(0.0, 0.0, 0.0);

        //gradiente
        vec3 color = vec3(abs(vUv - 0.5) * 2.0 * (1.0 - distort), 1.0);
        //gl_FragColor = vec4( color, 1.0 );
        vec2 uv = vUv;
        
        //color verde oscuro
        vec3 darkGreen = vec3(0.059, 0.545, 0.553);

        //color gamboge
        vec3 gamboge = vec3(0.925,0.604,0.161);

        //float mixValue = vUv.y;

        vec3 rosita = vec3(0.957,0.529,0.714);
        vec3 amarillo = vec3(0.992,0.882,0.176);

        vec3 finalColor = mix( amarillo,rosita, 0.5 + distort * 2.5);

        //agregarle animación
        
        
        //patron lineas
        //float pattern = fit(smoothMod(coords.y * 15.0, 1.0, 1.5), 0.2, 0.6, 0.0, 1.0);

        
        //gl_FragColor = vec4(vec3(color), 1.0 );
        gl_FragColor = vec4(finalColor, 1.0 );
    }
`;
export default fragmentShader;