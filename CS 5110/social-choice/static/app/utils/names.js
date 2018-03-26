const NAME_LIST = [
    "Fred", "George", "Bob", "Diego", "Amy", "Marice", "Steven", "Rachel",
    "Naomi", "Sarah", "John", "Roger", "Saori", "Pierre", "Sophie", "Wendy",
    "Natashya", "Qi", "Vladimir", "Joseph", "Anne", "Eva", "Ryan", "Dominique",
    "Matthew", "Roderic", "Samantha", "Marie", "Cameron", "Derek", "Lucy"
];

export default function() {

    const self = {};

    self.random = function () {
        const index = Math.floor(Math.random() * NAME_LIST.length);
        return NAME_LIST[index];
    };

    return self;

}