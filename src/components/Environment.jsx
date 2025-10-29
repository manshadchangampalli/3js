import { Sky, Environment } from "@react-three/drei";

const Environments = () => {
  return (
    <>
      {/* <Sky /> */}
      {/* <Environment preset="city" background /> */}
      <Environment background files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr" />
    </>
  );
};

export default Environments;
