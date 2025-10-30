import { PresentationControls, useGLTF } from "@react-three/drei";
import { angle } from "../../helper";

const PresentationControlComponent = () => {
    const model = useGLTF("./model/suzanne.gltf");
    return (
        <>
            <PresentationControls
                snap
                speed={20}
                rotation={[angle(-20), 0, 0]}
                polar={[Math.PI / 4, Math.PI / 4]}
                config={{ mass: 10, tension: 5000, friction: 206 }}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
                global>
                <primitive object={model.scene} />
            </PresentationControls>
        </>
    );
};

export default PresentationControlComponent;
