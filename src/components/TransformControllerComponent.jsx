import { TransformControls, useGLTF } from "@react-three/drei";

const TransformControllerComponent = () => {
    const model = useGLTF("./model/suzanne.gltf");
    return (
        <TransformControls>
            <primitive object={model.scene} />
        </TransformControls>
    );
};

export default TransformControllerComponent;
