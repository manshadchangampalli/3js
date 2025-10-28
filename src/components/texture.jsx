import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Texture = () => {
    const loader = useLoader(THREE.TextureLoader, './texture/image.png')
    return (
        <>
            <mesh>
                <planeGeometry />
                <meshBasicMaterial map={loader} side={THREE.DoubleSide} />
            </mesh>
        </>
    );
};

export default Texture