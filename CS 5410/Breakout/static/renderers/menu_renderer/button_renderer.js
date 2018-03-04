export default function (Renderer) {

return function ButtonRenderer(menuItem) {

    self = Renderer( menuItem.transform );

    return self;

}

}
