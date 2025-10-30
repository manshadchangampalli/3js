import { Grid, PerspectiveCamera } from "@react-three/drei";
import LevaController from "./components/LevaController";
import OrbitController from "./components/OrbitController";
import GridHelper from "./components/Grid";
import CameraControl from "./components/CameraControls";

const Scene = () => {
    return (
        <>
            {/* <mesh>
                <boxGeometry />
                <meshBasicMaterial color={'blue'} />
                </mesh> */}
            {/* <CustomGeoMetric /> */}
            {/* <Texture /> */}
            {/* <Particles /> */}
            {/* <Model /> */}
            {/* <Environment /> */}
            <CameraControl />
            <PerspectiveCamera makeDefault position={[0, 2, 5]} />
            <GridHelper />
            <LevaController />
            <OrbitController />
            {/* <CubeCamera>
                {(texture) => (
                    <mesh>
                        <sphereGeometry />
                        <meshStandardMaterial envMap={texture} />
                    </mesh>
                )}
            </CubeCamera> */}
            <ambientLight
                intensity={2}
                color={"white"}
            />
        </>
    );
};

export default Scene;
