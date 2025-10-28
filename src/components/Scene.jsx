import { OrbitControls } from "@react-three/drei";
import Animation from "./animation";
import SparklesComponent from "./Sparkles";
import Environment from "./Environment";
import { DoubleSide } from "three";
import { Leva } from "leva";
import LevaController from "./LevaController";

const Scene = () => {
    return (
        <>
            {/* <Animation /> */}
            <ambientLight intensity={2} />
            <LevaController />
            {/* <SparklesComponent /> */}
            <Environment />
            <OrbitControls />
        </>
    );
};

export default Scene;
