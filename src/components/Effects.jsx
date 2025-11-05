import { ChromaticAberration, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

function Effects() {
    return (
        <EffectComposer>
            {/* Chromatic Aberration - RGB color split at edges */}
            <ChromaticAberration
                offset={[0.003, 0.003]}
                radialModulation={true}
                modulationOffset={0.5}
            />

            {/* Vignette - Dark edges */}
            <Vignette
                offset={0.3}
                darkness={0.5}
                eskil={false}
                blendFunction={BlendFunction.NORMAL}
            />

            {/* Film Grain - Subtle texture */}
            <Noise
                opacity={0.05}
                blendFunction={BlendFunction.OVERLAY}
            />
        </EffectComposer>
    );
}

export default Effects;
