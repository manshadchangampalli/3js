import { CameraControls } from "@react-three/drei";
import { buttonGroup, useControls } from "leva";
import { useRef } from "react";

const CameraControl = () => {
    const cameraRef = useRef();
    console.log(cameraRef.current)
    useControls({
        moveLeft: buttonGroup({
            PosLeft: () => cameraRef.current.truck(-1, 0, true),
            PosRight: () => cameraRef.current.truck(1, 0, true)
        })
    })

    return (
        <>
            <CameraControls ref={cameraRef} />
        </>
    );
};

export default CameraControl;
