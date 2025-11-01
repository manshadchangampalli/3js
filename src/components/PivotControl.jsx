import { PivotControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import OrbitController from "./OrbitController";

const PivotControlComponent = () => {
    const orbitRef = useRef();
    const model = useGLTF("./model/suzanne.gltf");
    return (
        <>
            <OrbitController ref={orbitRef} />
            <PivotControls
                onDragStart={() => {
                    orbitRef.current.enabled = false;
                }}
                onDragEnd={() => {
                    orbitRef.current.enabled = false;
                }}
                annotations
                depthTest={false}>
                <primitive object={model.scene} />
            </PivotControls>
        </>
    );
};

export default PivotControlComponent;
