import * as THREE from "three";

const CustomGeoMetric = () => {
    const attribute = new Float32Array([
        0, 0, 0,
        1, 0, 0,
        0, 1, 0,

        1, 0, 0,
        0, 1, 0,
        1, 1, 0
    ])
    return (
        <>
            <mesh position={[2, 0, 0]}>
                <bufferGeometry>
                    <bufferAttribute attach={'attributes-position'} args={[attribute, 3]} />
                </bufferGeometry>
                <meshBasicMaterial color={"red"} side={THREE.DoubleSide} />
            </mesh>
        </>
    );
};

export default CustomGeoMetric