import Environmental from "./components/Enviromentals";
import Model from "./components/Model";
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
            <Model />
            <Environmental />
            <OrbitController />
            <ambientLight intensity={2} color={'white'} />
        </>
    );
};

export default Scene;
