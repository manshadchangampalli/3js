import { Grid, PerspectiveCamera } from "@react-three/drei";
import LevaController from "./components/LevaController";
import OrbitController from "./components/OrbitController";
import PresentationControl from "./components/PresentationControll";
import { DirectionalLight } from "three";
import FaceControlComponent from "./components/FaceControl";
import Scroll from "./components/Scroll";

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
            {/* <FaceControlComponent /> */}
            <Scroll />
            {/* <PresentationControl /> */}
            {/* <LevaController /> */}
            {/* <OrbitController /> */}
            {/* <CubeCamera>
                {(texture) => (
                    <mesh>
                        <sphereGeometry />
                        <meshStandardMaterial envMap={texture} />
                    </mesh>
                )}
            </CubeCamera> */}
            <directionalLight
                intensity={2}
                color={"#ffffff"}
            />
            <ambientLight
                intensity={2}
                color={"white"}
            />
        </>
    );
};

export default Scene;
