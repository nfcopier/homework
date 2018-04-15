import libraries from "./libraries/index.js"
import app from "./app/index.js"
import ui from "./ui/index.js"

export default function () {

    const lib = libraries();

    const App = app( lib );

    const Ui = ui( lib );

    const daUi = Ui(App());

    lib.$(".main").html(daUi.render().el);

}