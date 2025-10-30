import { DoubleSide } from "three";
import { angle } from "../../helper";
import { useControls } from "leva";

const LevaController = () => {
    const { xRotation, args } = useControls({
        xRotation: {
            value: 90,
            min: 0,
            max: 360,
        },
        args: {
            width: 5,
            height: 5,
            wSegment: 1,
            hSegment: 1,
        },
    });
    console.log(args);
    return (
        <mesh rotation={[-angle(xRotation), 0, 0]}>
            <planeGeometry args={[args?.width, args?.height, args?.wSegment, args?.hSegment]} />
            <meshBasicMaterial
                color={"#00ffff"}
                side={DoubleSide}
            />
        </mesh>
    );
};

export default LevaController;
