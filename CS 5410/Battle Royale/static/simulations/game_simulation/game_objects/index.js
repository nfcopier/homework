import avatar     from "./avatar.js";
import building   from "./building.js";
import gameObject from "./game_object.js";

export default function() {

    const GameObject = gameObject();

    const Avatar = avatar(GameObject);

    const Building = building(GameObject);

    return {
        GameObject: GameObject,
        Avatar    : Avatar,
        Building  : Building
    };
}
