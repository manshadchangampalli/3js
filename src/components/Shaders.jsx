import { MeshDiscardMaterial, MeshReflectorMaterial } from "@react-three/drei";
import { DoubleSide } from "three";
import { angle } from "../../helper";

const Shaders = () => {
    return (
        <>
            <directionalLight
                intensity={5}
                castShadow
            />
            <mesh
                castShadow
                position={[0, 1.8, 0]}>
                <torusKnotGeometry args={[1, 0.3, 100, 32, 32]} />
                <meshStandardMaterial color={"pink"} />
            </mesh>
            <ambientLight />
            <mesh
                rotation-x={angle(-80)}
                receiveShadow>
                <planeGeometry args={[6, 6, 1, 1]} />
                <MeshReflectorMaterial mirror={1} blur={[4, 4]} reflectorOffset={0.2} />
            </mesh>
        </>
    );
};

export default Shaders;
