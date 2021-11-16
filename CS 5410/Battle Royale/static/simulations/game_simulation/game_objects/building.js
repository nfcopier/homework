export default function(
    GameObject
) {

    return function Building(buildingData) {

        const self = GameObject(buildingData.transform);

        self.contains = function(playerTransform) {
            return (
                buildingData.transform.x < playerTransform.x &&
                buildingData.transform.y < playerTransform.y &&
                buildingData.transform.x + buildingData.transform.width > playerTransform.x + playerTransform.width &&
                buildingData.transform.y + buildingData.transform.height > playerTransform.y + playerTransform.height
            );
        };

        self.data = buildingData;

        return self;

    };

}
