import gameObject from "./game_object.js"
import building from "./building.js"
import avatar from "./avatar.js"

export default function (
) {

    const GameObject = gameObject();

    const Avatar = avatar( GameObject );

    const Building = building( GameObject );

    return {
        GameObject: GameObject,
        Avatar: Avatar,
        Building: Building
    }
}
