import { FaceControls, FaceLandmarker } from "@react-three/drei";
import Environments from "./Environment";

const FaceControlComponent = () => {
    return (
        <FaceLandmarker>
            <Environments />
            <FaceControls videoTexture={Environments} />
        </FaceLandmarker>
    );
};

export default FaceControlComponent