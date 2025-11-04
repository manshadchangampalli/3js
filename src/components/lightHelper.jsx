import { CameraControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { angle } from "../../helper";

const LightHelper = () => {
    const ref = useRef();
    const cameraRef = useRef()
    useHelper(ref, THREE.DirectionalLightHelper, 1, "hotpink");
    useHelper(cameraRef, THREE.CameraHelper, 1, 'hotpink')
    return (
        <>
            <axesHelper />
            <directionalLight
                // position={[2, 2, 0]}
                ref={ref}
                intensity={2}
                color={"white"}
            />
            <ambientLight />
            <mesh>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
            <mesh>
                <planeGeometry args={[3, 3]} />
                <meshBasicMaterial color={'white'} side={THREE.DoubleSide} />
            </mesh>
            <PerspectiveCamera args={[75, window.innerWidth / window.innerHeight]} ref={cameraRef} />
            <CameraControls />
        </>
    );
};

export default LightHelper;
