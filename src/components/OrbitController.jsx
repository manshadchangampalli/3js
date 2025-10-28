import { extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/addons";

const OrbitController = () => {
    const { camera, gl } = useThree();
    const Controls = extend(OrbitControls);
    return <Controls args={[camera, gl.domElement]} />;
};

export default OrbitController;
