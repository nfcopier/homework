import app from "./app/index.js"
import ui from "./ui/index.js"

export default function (
    $,
    _,
    backbone
) {

    const App = app();
    const Ui = ui(
        backbone,
        $
    );

    const daApp = App();
    const daUi = Ui(daApp);

    $(".main").html(daUi.render().el);
    daApp.start();

}