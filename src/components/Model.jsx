import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const Model = () => {
    const modelLoader = useLoader(GLTFLoader, "./model/suzanne.gltf");
    return (
        <>
            <primitive
                position-y={0.04}
                object={modelLoader.scene}
            />
        </>
    );
};

export default Model;
