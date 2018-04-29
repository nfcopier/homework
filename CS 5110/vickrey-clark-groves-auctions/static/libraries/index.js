import backbone from "./backbone.js"

export default  function () {

    const b = backbone(window.Backbone);
    delete window.Backbone;

    const jquery = window.$;
    delete window.$;

    return {
        backbone: b,
        $: jquery
    };

}