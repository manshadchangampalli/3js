import { useLoader, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as  THREE from 'three'

const Particles = () => {
    const particleRef = useRef()

    const loader = useLoader(THREE.TextureLoader, './texture/snowflake.png')
    const verticesAmount = 2000;
    const positionArray = new Float32Array(verticesAmount * 3);

    for (let i = 0; i < verticesAmount * 3; i++) {
        positionArray[i] = (Math.random() - 0.5) * 10
    }

    useFrame((_, delta) => {
        particleRef.current.rotation.y += delta * 0.1
        particleRef.current.rotation.x += delta * 0.1
    })


    return (
        <points ref={particleRef}>
            <bufferGeometry>
                <bufferAttribute attach={"attributes-position"} args={[positionArray, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.03} alphaMap={loader} transparent depthTest={false} />
        </points>
    );
};

export default Particles