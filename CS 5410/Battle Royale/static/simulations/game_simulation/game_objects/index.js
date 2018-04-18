import gameObject from "./game_object.js"
import avatar from "./avatar.js"

export default function (
) {

    const GameObject = gameObject();

    const Avatar = avatar( GameObject );

    return {
        GameObject: GameObject,
        Avatar: Avatar
    }
}
