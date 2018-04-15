export default function (
    View,
    $
) {

return function Table(labels, keys, models) {

    const self = View({ tagName: "table", className: "table is-fullwidth" });

    self.render = function () {
        self.$el.append( _header() );
        self.$el.append( _tableBody() );
        return this;
    };

    const _header = function () { return `
        <thead>
            ${labels.map( _headerCell ).join("\n") }
        </thead>
    `};

    const _headerCell = function (label) { return `
            <td>${label}</td>
    `};

    const _tableBody = function () {
        const $body = $("<tbody>");
        for (let model of models)
            $body.append( _rowTemplate(model) );
        return $body;
    };

    const _rowTemplate = function (model) { return `
        <tr>
            ${keys.map( _rowCell(model) ).join("\n")}
        </tr>
    `};

    const _rowCell = function (model) { return (key) => { return `
            <td>${model[key]}</td>
    `}};

    return self;

};

}