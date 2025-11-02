import { Gltf, RoundedBoxGeometry, useTexture, MeshPortalMaterial, Environment, CameraControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { angle } from "../../helper";

const MeshPortalMaterials = () => {
  const meshPortalRef1 = useRef();
  const meshPortalRef2 = useRef();
  const meshPortalRef3 = useRef();
  const cameraRef = useRef();
  const [clicked, setClicked] = useState(0);
  const texture = useTexture("./texture/image.png");

  useFrame((_, delta) => {
    if (meshPortalRef1.current) {
      easing.damp(meshPortalRef1.current, "blend", clicked === 1 ? 1 : 0, 0.1, delta);
    }
    if (meshPortalRef2.current) {
      easing.damp(meshPortalRef2.current, "blend", clicked === 2 ? 1 : 0, 0.1, delta);
    }
    if (meshPortalRef3.current) {
      easing.damp(meshPortalRef3.current, "blend", clicked === 3 ? 1 : 0, 0.1, delta);
    }
  });

  useEffect(() => {
    if (cameraRef?.current) {
      if (clicked === 1) {
        // Position camera closer and look at center of portal content
        cameraRef?.current?.setLookAt(-2, 0, 3, -3, 0, 0, true);
      } else if (clicked === 2) {
        cameraRef?.current?.setLookAt(0, 0, 3, 0, 0, 0, true);
      } else if (clicked === 3) {
        cameraRef?.current?.setLookAt(2, 0, 3, 3, 0, 0, true);
      } else {
        cameraRef?.current?.setLookAt(0, 0, 5, 0, 0, 0, true);
      }
    }
  }, [clicked]);

  return (
    <>
      <mesh
        position={[-3, 0, 0]}
        rotation-y={angle(20)}
        onClick={() => {
          setClicked(clicked === 1 ? 0 : 1);
        }}>
        <RoundedBoxGeometry
          radius={0.2}
          args={[2, 3, 0.1]}
        />
        <MeshPortalMaterial ref={meshPortalRef1}>
          <Gltf
            position={[0, 0, 0]}
            scale={1}
            src="./model/suzanne.gltf"
          />
          <ambientLight />
          <Environment preset="sunset" />
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshBasicMaterial
              map={texture}
              side={THREE.BackSide}
            />
          </mesh>
        </MeshPortalMaterial>
      </mesh>
      <mesh
        onClick={() => {
          setClicked(clicked === 2 ? 0 : 2);
        }}>
        <RoundedBoxGeometry
          radius={0.2}
          args={[2, 3, 0.1]}
        />
        <MeshPortalMaterial ref={meshPortalRef2}>
          <Gltf
            position={[0, 0, 0]}
            scale={1}
            src="./model/suzanne.gltf"
          />
          <ambientLight />
          <Environment preset="sunset" />
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshBasicMaterial
              map={texture}
              side={THREE.BackSide}
            />
          </mesh>
        </MeshPortalMaterial>
      </mesh>
      <mesh
        rotation-y={angle(-20)}
        position={[3, 0, 0]}
        onClick={() => {
          setClicked(clicked === 3 ? 0 : 3);
        }}>
        <RoundedBoxGeometry
          radius={0.2}
          args={[2, 3, 0.1]}
        />
        <MeshPortalMaterial ref={meshPortalRef3}>
          <Gltf
            position={[0, 0, 0]}
            scale={1}
            src="./model/suzanne.gltf"
          />
          <ambientLight />
          <Environment preset="sunset" />
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshBasicMaterial
              map={texture}
              side={THREE.BackSide}
            />
          </mesh>
        </MeshPortalMaterial>
      </mesh>
      <CameraControls
        enabled={clicked !== 0}
        ref={cameraRef}
      />
    </>
  );
};

export default MeshPortalMaterials;