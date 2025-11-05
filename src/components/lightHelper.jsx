import { CameraControls, Environment, useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { angle } from "../../helper";

const LightHelper = () => {
    const lightRef = useRef();

    useHelper(lightRef, THREE.DirectionalLightHelper, 1, "hotpink");

    return (
        <>
            <axesHelper />
            <directionalLight
                castShadow
                ref={lightRef}
                intensity={2}
                color="white"
                position={[1, 2, 0]}
            />
            <ambientLight intensity={0.5} />

            <mesh castShadow>
                <boxGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>

            <mesh receiveShadow rotation={[angle(90), 0, 0]} position={[0, -3 / 4, 0]}>
                <planeGeometry args={[3, 3]} />
                <meshStandardMaterial
                    color="gray"
                    side={THREE.DoubleSide}
                />
            </mesh>
            <CameraControls
                makeDefault
                polarAngle={angle(70)}
            // polarAngle={angle(170)}
            // target={[0, 0, 0]} // Look at center
            // polarAngle={angle(30)} // 70° down from horizontal          // No horizontal offset
            // distance={10}
            />
            <Environment preset="sunset" />
        </>
    );
};

export default LightHelper;
