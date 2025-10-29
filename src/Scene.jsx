import { CubeCamera } from "@react-three/drei";
import Environment from "./components/Environment";
import LevaController from "./components/LevaController";
import OrbitController from "./components/OrbitController";

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
            <Environment />
            <LevaController />
            <OrbitController />
            <CubeCamera>
                {(texture) => (
                    <mesh>
                        <sphereGeometry />
                        <meshStandardMaterial envMap={texture} />
                    </mesh>
                )}
            </CubeCamera>
            <ambientLight
                intensity={2}
                color={"white"}
            />
        </>
    );
};

export default Scene;
