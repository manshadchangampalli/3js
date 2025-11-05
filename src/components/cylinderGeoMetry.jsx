import { CameraControls } from "@react-three/drei";
import { BackSide } from "three";

const CylinderGeoMetry = () => {
    return (
        <>
            <mesh>
                <cylinderGeometry args={[3, 3, 6, 32, 32]} />
                <meshNormalMaterial side={BackSide} />
            </mesh>
            <CameraControls />
        </>
    );
};

export default CylinderGeoMetry;
