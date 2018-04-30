export default function (simWidth, simHeight) {

    const $ = document.querySelector.bind(document);
    const canvas = $(".sim-canvas");
    const canvasLeft = canvas.offsetLeft;
    const canvasTop = canvas.offsetTop;
    const scaleX = simWidth / canvas.clientWidth;
    const scaleY = simHeight / canvas.clientHeight;
    EventTarget.prototype.on = EventTarget.prototype.addEventListener;

    const self = {};

    const $play = $("#play");
    const $pause = $("#pause");
    const $reset = $("#reset");

    let input = {
        control  : null,
        entity   : "1",
        addEntity: false
    };

    const initialize = function() {
        listenToControls();
        listenToMouse();
    };

    const listenToControls = function () {
        for (let i = 1; i < 4; i++)
            $(`#environ-${i}`).on("click", onChooseEnviron(i));
        for (let l of ['a', 'b', 'c', 'd'])
            $(`#agent-${l}`).on("click", onChooseAgent(l));
        for (let id of ["play", "pause", "reset"])
            $(`#${id}`).on("click", onChooseControl(id));
        $play.on( "click", onClickPlay );
        $pause.on( "click", onClickPause );
        $reset.on( "click", onClickPause );
    };

    const onChooseEnviron = function (i) {
        return () => input.entity = `${i}`;
    };

    const onChooseAgent = function (l) {
        return () => input.entity = l;
    };

    const onChooseControl = function (id) {
        return () => input.control = id;
    };

    const onClickPlay = function () {
        $play.disabled = true;
        $pause.disabled = false;
    };

    const onClickPause = function () {
        $play.disabled = false;
        $pause.disabled = true;
    };

    const listenToMouse = function () {
        const $sim = $(".sim-canvas");
        $sim.on("mousedown", onMouseDown);
        $sim.on("mousemove", onMouseMove);
        $("body").on("mouseup", onMouseUp);
    };

    const onMouseDown = () => input.addEntity = true;

    const onMouseMove = function(event) {
        input.mouseLocation = {
            x: (event.x - canvasLeft) * scaleX,
            y: (event.y - canvasTop) * scaleY
        };
    };

    const onMouseUp = () => input.addEntity = false;

    self.input = () => input;

    self.reset = function () {
        input.control = null;
    };

    initialize();

    return self;

}
