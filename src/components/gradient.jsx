import { GradientTexture, GradientType } from "@react-three/drei";

const Gradient = () => {
    return (
        <mesh>
            <planeGeometry args={[1, 2]} />
            <meshBasicMaterial>
                <GradientTexture
                    stops={[0, 0.5, 1]}
                    type={GradientType.Radial}
                    // innerCircleRadius={0.5}
                    outerCircleRadius={500}
                    colors={["white", "red", 'blue']}
                />
            </meshBasicMaterial>
        </mesh>
    );
};

export default Gradient;
