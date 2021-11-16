import shatteringEffect from "./brick_shattering_effect.js";
import particleSystem   from "./particle_system.js";
import {Gaussian}       from "./random.js";

export default function() {

    const ShatteringEffect = shatteringEffect(
        {Gaussian: Gaussian}
    );

    return particleSystem(
        ShatteringEffect
    );

}
