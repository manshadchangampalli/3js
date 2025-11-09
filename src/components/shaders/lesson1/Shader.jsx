// src/AnimatedPlane.jsx
import { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { ShaderMaterial } from 'three';
import vertexShader from './Shader1.vertex.glsl?raw';
import fragmentShader from './Shader1.fragment.glsl?raw';

// Optional: give TypeScript/JSX a hint about the custom material
extend({ ShaderMaterial });

export default function AnimatedPlane() {
    const materialRef = useRef();
    const { mouse } = useThree();

    // Update the `uTime` uniform each frame
    useFrame(() => {
        materialRef.current.uniforms.uMouse.value = [mouse.x, mouse.y];
    });

    return (
        <mesh>
            {/* A simple plane geometry */}
            <planeGeometry args={[2, 2, 32, 32]} />
            {/* Attach our custom ShaderMaterial */}
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    uTime: { value: 0 },
                    uMouse: { value: [0, 0] },
                }}
                // Turn off lights (our shader does its own coloring)
                lights={false}
            />
        </mesh>
    );
}