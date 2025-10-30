import { Grid } from '@react-three/drei'
import { DoubleSide } from 'three'

const GridHelper = () => {
  return (
    <>
      <Grid args={[10, 10, 20, 20]} side={DoubleSide} />
    </>
  )
}

export default GridHelper